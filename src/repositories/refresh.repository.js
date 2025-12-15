// src/repositories/refresh.repository.js
const pool = require("../config/db");

async function save({ userId, token, expiresAt }) {
  const result = await pool.query(
    `
    INSERT INTO refresh_tokens (user_id, token, expires_at)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [userId, token, expiresAt]
  );
  return result.rows[0];
}
async function findByUserId(userId) {
  const result = await pool.query(
    `SELECT * FROM refresh_tokens WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0];
}
async function saveOrUpdate({ userId, token, expiresAt }) {
  const existing = await pool.query(
    "SELECT * FROM refresh_tokens WHERE user_id = $1",
    [userId]
  );

  if (existing.rows.length) {
    // Actualizar token existente
    const result = await pool.query(
      `UPDATE refresh_tokens
       SET token = $1, expires_at = $2
       WHERE user_id = $3
       RETURNING *`,
      [token, expiresAt, userId]
    );
    return result.rows[0];
  } else {
    // Crear nuevo token
    return save({ userId, token, expiresAt });
  }
}



async function findByToken(token) {
  const result = await pool.query(
    `
    SELECT * FROM refresh_tokens
    WHERE token = $1 AND expires_at > NOW()
    `,
    [token]
  );

  return result.rows[0];
}

async function deleteByToken(token) {
  await pool.query(
    `DELETE FROM refresh_tokens WHERE token = $1`,
    [token]
  );
}

module.exports = {
  save,
  saveOrUpdate,
  findByToken,
  findByUserId,
  deleteByToken,
};