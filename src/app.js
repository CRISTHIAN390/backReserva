const express = require("express");
const cors = require("cors");

// Configuraciones
const passport = require("./config/passport");

// Rutas
const authRoutes = require("./routes/auth.routes");

// App
const app = express();

// ==================================================
// Middlewares globales
// ==================================================

// Permitir peticiones externas
app.use(cors({
  origin: "*", // luego en prod pon tu dominio
  methods: ["GET", "POST"],
  credentials: true
}));


// Leer JSON
app.use(express.json());

// Inicializar Passport
app.use(passport.initialize());

// ==================================================
// Rutas
// ==================================================

app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("¡El backend está funcionando correctamente!");
});

module.exports = app;
