const authService = require("../services/auth.service");

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

// Login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.json({ token });
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

module.exports = {
  register,
  login,
  me,
};
