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

async function createOAuthUser({
  email,
  provider,
  providerId,
  name,
  surnames,
  picture,
}) {
  const result = await pool.query(
    `
    INSERT INTO users (email, provider, provider_id, name, surnames, picture)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [email, provider, providerId, name, surnames, picture]
  );

  return result.rows[0];
}

async function createGoogleUser({
  email,
  provider,
  providerId,
  name,
  picture,
  emailVerified,
}) {
  const result = await pool.query(
    `
    INSERT INTO users (email, provider, provider_id, name, picture, email_verified)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [email, provider, providerId, name, picture, emailVerified]
  );

  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    `
    SELECT id, email, role, is_active
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

module.exports = {
  findById,
  findByEmail,
  createUser,
  createOAuthUser,
  createGoogleUser,
};
