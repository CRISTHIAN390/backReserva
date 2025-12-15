const pool = require("../config/db");

/**
 * Busca un usuario por email
 * @param {string} email
 * @returns usuario o undefined
 */
async function findByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email] // Previene SQL Injection
  );

  // rows[0] devuelve el primer registro o undefined
  return result.rows[0];
}

/**
 * Crea un nuevo usuario
 * @param {Object} data
 */
async function createUser({ email, passwordHash }) {
  const result = await pool.query(
    `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING *
    `,
    [email, passwordHash]
  );

  return result.rows[0];
}

module.exports = {
  findByEmail,
  createUser,
};
