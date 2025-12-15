//👉Verificar JWT
//👉Proteger rutas privadas

const { verifyToken } = require("../utils/jwt");

/**
 * Middleware de autenticación
 * Se ejecuta ANTES del controller
 */
function authMiddleware(req, res, next) {
  try {
    // El token viene normalmente en el header Authorization
    // Ej: Authorization: Bearer eyJhbGciOi...
    const authHeader = req.headers.authorization;

    // Si no existe el header → no está autenticado
    if (!authHeader) {
      return res.status(401).json({ message: "Token requerido" });
    }

    // Separamos "Bearer" del token
    const token = authHeader.split(" ")[1];

    // Verificamos el token
    const payload = verifyToken(token);

    // Guardamos el payload en la request
    // para usarlo en el controller
    req.user = payload;

    // Continúa hacia el controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

module.exports = authMiddleware;
