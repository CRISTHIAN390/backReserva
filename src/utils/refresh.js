const crypto = require("crypto");
const refreshRepo = require("../repositories/refresh.repository");
const { DateTime } = require("luxon");
/**
 * Genera un Refresh Token, lo guarda en BD
 * y devuelve el token al controller
 */


async function generateRefreshToken(user) {
  // Revisar si ya existe un refresh token válido
  const existing = await refreshRepo.findByUserId(user.id);

  if (existing) {
    // Si no expiró, devolvemos el mismo token
    const nowPeru = DateTime.now().setZone("America/Lima").toJSDate();
    if (existing.expires_at > nowPeru) {
      return existing.token;
    }
  }

  // Si no existe o expiró, generar uno nuevo
  const refreshToken = crypto.randomUUID();
  const expiresAt = DateTime.now().setZone("America/Lima").plus({ days: 15 }).toJSDate();

  await refreshRepo.saveOrUpdate({userId: user.id,token: refreshToken,expiresAt,});

  return refreshToken;
}

module.exports = {
  generateRefreshToken,
};
