## Auth Backend

Backend de autenticación robusto desarrollado con Node.js, Express y PostgreSQL, que implementa autenticación tradicional con email y contraseña, así como OAuth 2.0 con Google.
Incluye manejo de JWT (access token) y refresh token, asegurando sesiones seguras y persistentes.

Flujo de autenticación

Login local: usuario inicia sesión con email y contraseña.

Login con Google (Web): redirecciona al usuario al login de Google, y luego recibe un JWT en el callback.

Login con Google (Mobile): desde tu app Flutter o React Native se envía el idToken al backend, que valida con Google y genera un JWT.

⚠️ Nota: Para usar OAuth con Google, solicita tus credenciales en Google Cloud Console
.https://console.cloud.google.com/apis/credentials

## Manejo de tokens

Access Token: se genera en cada login y tiene una expiración corta (ej. 15 minutos).

Refresh Token: se genera solo si no existe uno válido o ha expirado, evitando cambiarlo en cada inicio de sesión.

Permite refrescar access tokens sin necesidad de que el usuario vuelva a autenticarse.

## Características

Manejo de usuarios locales y Google, con verificación de duplicados.

Endpoints públicos y privados, con middleware de autenticación JWT.

Logout seguro, eliminando el refresh token.

Compatibilidad con apps móviles y web.

## Tecnologías

Node.js

Express

PostgreSQL

JWT

bcrypt

OAuth 2.0 (Google)

## Instalación
```bash
npm install
npm run dev
