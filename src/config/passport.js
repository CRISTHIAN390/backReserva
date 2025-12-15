const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const authService = require("../services/auth.service");

//👉 Configuración de Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Enviamos el perfil al service
        const user = await authService.googleLogin(profile);
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
