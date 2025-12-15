//👉 Responsabilidad: Definir endpoints

const express = require("express");
const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const passport = require("../config/passport");
const { googleMobileLogin } = require("../controllers/google.controller");
const router = express.Router();


/**
 * =========================
 * RUTAS PÚBLICAS (LOCAL)
 * =========================
 */
// Registro con email y password (auth local)
router.post("/register", controller.register);

// Login con email y password (auth local)
router.post("/login", controller.login);

router.post("/refresh", controller.refresh);

router.post("/logout", controller.logout);

/**
 * =========================
 * RUTAS PRIVADAS
 * =========================
 */


// Devuelve la información del usuario autenticado
// Requiere JWT en el header Authorization
router.get("/me", authMiddleware, controller.me);


/**
 * =========================
 * GOOGLE AUTH - WEB
 * =========================
 * - Next.js
 * - Web tradicional
 */
// Inicia autenticación con Google (redirige al login de Google)
router.get("/google",passport.authenticate("google", {scope: ["profile", "email"],}));

// Callback que Google llama luego del login
// Passport valida al usuario y genera TU JWT
router.get("/google/callback",passport.authenticate("google", { session: false }),
  (req, res) => {
    // Passport nos devuelve el JWT en req.user
    res.json({ token: req.user });
  }
);


/**
 * =========================
 * GOOGLE AUTH - MOBILE
 * =========================
 * - Flutter
 * - React Native
 * - Apps móviles
 * Flujo:
 * Flutter -> Google SDK -> idToken -> Backend -> JWT
 */
// Autenticación Google para apps móviles
router.post("/google/mobile", googleMobileLogin);


module.exports = router;
