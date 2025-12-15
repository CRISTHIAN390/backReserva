const userRepo = require("../repositories/user.repository");
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");
const { generateRefreshToken } = require("../utils/refresh");

//👉 Responsabilidad: Lógica de negocio

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
  // Generar access token
  const accessToken = signToken({id: user.id,email: user.email,});

  // Generar refresh token
  const refreshToken = await generateRefreshToken(user);

  // Retornamos usuario + tokens
  return {
    user,
    accessToken,
    refreshToken,
  };
}





//👉 lógica Google
async function googleLogin(profile) {
  const email = profile.emails[0].value;
  const providerId = profile.id;

  // ¿Existe por email?
  let user = await userRepo.findByEmail(email);

  // Si no existe → crear usuario Google
  if (!user) {
    user = await userRepo.createOAuthUser({
      email,
      provider: "google",
      providerId,
      name: profile.name.givenName,
      surnames: profile.name.familyName,
      picture: profile.photos[0].value,
    });
  }

  // Generar access token
  const accessToken = signToken({
    id: user.id,
    email: user.email,
  });


  // Generar refresh token
  const refreshToken = await generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      surnames: user.surnames,
      picture: user.picture,
    },
  };
}





module.exports = {
  register,
  login,
  googleLogin,
};
