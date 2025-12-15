//👉 Responsabilidad: Arrancar el servidor

require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

//PARA OBTENER CREDENCIALES :https://console.cloud.google.com/apis/credentials
//Controller → Service → Repository → DB
//primero definimos en .json 
//npm run dev