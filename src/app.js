//👉 Responsabilidad: Configurar Express

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Permite peticiones externas
app.use(cors());

// Permite leer JSON
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("¡El backend está funcionando correctamente!");
});

module.exports = app;
