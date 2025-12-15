// Importamos Pool desde pg ya q maneja conexiones a PostgreSQL
const { Pool } = require("pg");

// Cargamos  entorno desde .env
require("dotenv").config();

// Creamos el pool de conexiones usando las variables del .env
const pool = new Pool({
  host: process.env.DB_HOST,      // Host de la BD (localhost)
  port: process.env.DB_PORT,      // Puerto (5432)
  user: process.env.DB_USER,      // Usuario de Postgres
  password: process.env.DB_PASSWORD, // Password
  database: process.env.DB_NAME,  // Nombre de la BD
});

// Evento que se ejecuta cuando se conecta correctamente
pool.on("connect", () => {
  console.log("🟢 Conectado a PostgreSQL");
});

// Exportamos el pool para usarlo en repositories
module.exports = pool;
