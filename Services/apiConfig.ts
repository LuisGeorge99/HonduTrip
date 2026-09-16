// Services/apiConfig.ts
//
// IMPORTANTE: si corres la app en un celular físico o en el emulador,
// "localhost" apunta al propio dispositivo, no a tu computadora donde
// corre el backend. Reemplaza esta IP por la IP local de tu computadora
// en la red (ej: 192.168.1.50). En Windows: ipconfig. En Linux/Mac: ifconfig
// o ip a. El backend debe estar corriendo (cd backend && npm run start).
//
// Si usas el emulador de Android Studio, puedes usar 10.0.2.2 en vez de
// tu IP local (es un alias especial que apunta a "localhost" de tu PC).

const LOCAL_IP = '192.168.1.50'; // <-- cámbialo por la IP de tu computadora
const PORT = 4000;

export const API_BASE_URL = `http://${LOCAL_IP}:${PORT}/api`;
