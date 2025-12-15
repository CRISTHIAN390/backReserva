const jwt = require("jsonwebtoken");

/**
 * Firma un token JWT
 */
function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // ej: 15m
  });
}

/**
 * Verifica un token JWT
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function generateToken(payload, expiresIn = "15m") {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

module.exports = {
  signToken,
  verifyToken,
  generateToken ,
};
