const crypto = require("crypto");
const refreshRepo = require("../repositories/refresh.repository");

/**
 * Genera un Refresh Token, lo guarda en BD
 * y devuelve el token al controller
 */


async function generateRefreshToken(user) {
  // Generar token único
  const refreshToken = crypto.randomUUID();

  // Expira en 15 días
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 15);

  // Guardar o actualizar en base de datos
  await refreshRepo.saveOrUpdate({
    userId: user.id,
    token: refreshToken,
    expiresAt,
  });
  return refreshToken;
}


module.exports = {
  generateRefreshToken,
};
