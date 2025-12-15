const userRepo = require("../repositories/user.repository");
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");


//👉 Responsabilidad: Lógica de negocio
//👉 Aquí vive la inteligencia

/**
 * Registro de usuario
 */
async function register(email, password) {
  // Verificamos si el usuario ya existe
  const exists = await userRepo.findByEmail(email);
  if (exists) {
    throw new Error("Usuario ya existe");
  }

  // Hasheamos la contraseña
  const passwordHash = await hashPassword(password);

  // Creamos el usuario
  return userRepo.createUser({ email, passwordHash });
}

/**
 * Login de usuario
 */
async function login(email, password) {
  // Buscamos usuario
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  // Comparamos password
  const ok = await comparePassword(password, user.password_hash);
  if (!ok) {
    throw new Error("Credenciales inválidas");
  }

  // Generamos JWT propio
  const token = signToken({
    id: user.id,
    email: user.email,
  });

  return token;
}

module.exports = {
  register,
  login,
};
