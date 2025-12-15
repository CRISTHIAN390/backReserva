const authService = require("../services/auth.service");
const userRepo = require("../repositories/user.repository");
const refreshRepo = require("../repositories/refresh.repository");
const { generateToken } = require("../utils/jwt");
const { generateRefreshToken } = require("../utils/refresh");
//👉 Responsabilidad: HTTP
//👉 Entrada y salida

// Registro
async function register(req, res) {
  console.log(req.body); // 👈 DEBUG
  const { email, password } = req.body;
  try {
    await authService.register(email, password);
    res.status(201).json({ message: "Usuario registrado" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// ------------------ LOGIN ------------------
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // authService debe devolver el USER, no solo el token
    const { user, accessToken, refreshToken } = await authService.login(email, password);
    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

/**
 * Devuelve datos del usuario autenticado
 */
async function me(req, res) {
  // req.user viene del middleware JWT
  res.json({
    user: req.user,
  });
}

// ------------------ REFRESH ------------------
async function refresh(req, res) {
  const { refreshToken } = req.body;

  try {
    const record = await refreshRepo.findByToken(refreshToken);
    if (!record) {
      return res.status(401).json({ message: "Refresh token inválido" });
    }

    const user = await userRepo.findById(record.user_id);

    const newAccessToken = generateToken(
      { id: user.id, role: user.role },
      "15m"
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(500).json({ message: "Error al refrescar token" });
  }
}

// ------------------ LOGOUT ------------------
async function logout(req, res) {
  const { refreshToken } = req.body;

  await refreshRepo.deleteByToken(refreshToken);

  res.json({ message: "Sesión cerrada correctamente" });
}

module.exports = {
  register,
  login,
  refresh,
  logout,
  me,
};
