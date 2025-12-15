const bcrypt = require("bcrypt");

// Hashea la contraseña antes de guardarla
async function hashPassword(password) {
  return bcrypt.hash(password, 10); // 10 salt rounds
}

// Compara password plano con hash
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}


module.exports = {
  hashPassword,
  comparePassword,
};
