const googleClient = require("../config/google");
const userRepo = require("../repositories/user.repository");
const { generateToken } = require("../utils/jwt");
const { generateRefreshToken } = require("../utils/refresh");
async function googleMobileLogin(req, res) {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "idToken requerido" });
    }

    // 1️⃣ Verificar token con Google
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub: googleId, email, name, picture, email_verified } = payload;

    // 2️⃣ Buscar usuario
    let user = await userRepo.findByEmail(email);

    // 3️⃣ Crear si no existe
    if (user) {
      // Si el usuario ya existe, no permitimos login con Google
      if (user.provider === "local") {
        return res.status(400).json({ message: "Debes iniciar sesión con tu contraseña." });
      }
    } else {
      // Si el usuario no existe, creamos uno nuevo con Google
      user = await userRepo.createGoogleUser({
        email,
        provider: "google",
        providerId: googleId,
        name,
        picture,
        emailVerified: email_verified,
      });
    }

    // 4️⃣ Generar TU JWT
    const accessToken = generateToken({ id: user.id, role: user.role });
    const refreshToken = await generateRefreshToken(user);    
    return res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token Google inválido" });
  }
}

module.exports = {

     googleMobileLogin 

};
