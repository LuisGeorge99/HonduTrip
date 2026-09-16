# HondurTrip — Backend de Autenticación

Backend real (Node.js + Express + Sequelize + MySQL) para el login,
registro y perfil de HondurTrip. Sigue la misma técnica que el profe
enseñó en su repo de ejemplo (Semana 6): Express + Sequelize, con
modelos en `Modelos/` y la conexión en `db/connection.js`.

Las contraseñas nunca se guardan en texto plano: se hashean con
`bcryptjs`. La sesión se maneja con JWT (JSON Web Token).

## Requisitos

- Node.js instalado
- MySQL corriendo (con XAMPP, WAMP, MySQL Workbench, o lo que ya
  tengas instalado para tus otras materias)

## Configuración de la base de datos

1. Abre phpMyAdmin (o tu cliente de MySQL) y crea una base de datos
   vacía llamada `hondutrip`:
   ```sql
   CREATE DATABASE hondutrip CHARACTER SET utf8mb4;
   ```
2. La tabla `Usuario` **se crea sola** la primera vez que arrancas el
   servidor (usa `sequelize.sync()` en `server.js` — no necesitas
   correr ningún CREATE TABLE a mano).

## Instalación y arranque

```bash
cd backend
npm install
cp .env.example .env
```

Abre `.env` y ajusta `DB_USER` / `DB_PASSWORD` si tu MySQL no es el
típico root sin contraseña de XAMPP.

```bash
npm start
```

Si ves `Conexión exitosa` y luego `HondurTrip backend corriendo en
http://0.0.0.0:4000`, todo está bien. Si sale un error de conexión,
casi siempre es que XAMPP/MySQL no está corriendo, o el usuario/clave
en `.env` no coinciden con tu MySQL local.

## Conectar la app (Expo) al backend

Edita `Services/apiConfig.ts` en la raíz del proyecto y cambia
`LOCAL_IP` por la IP local de tu computadora (donde corre este
backend):

- **Windows:** `ipconfig` → busca "Dirección IPv4"
- **Linux/Mac:** `ip a` o `ifconfig`
- **Emulador de Android Studio:** puedes usar `10.0.2.2` en vez de tu IP

Tu celular (si usas Expo Go) y tu computadora deben estar en la
**misma red Wi-Fi**.

## Endpoints

| Método | Ruta                | Auth | Descripción                          |
|--------|---------------------|------|---------------------------------------|
| GET    | /api/health          | No   | Verifica que el servidor esté vivo    |
| POST   | /api/auth/register   | No   | `{ name, email, password }`           |
| POST   | /api/auth/login      | No   | `{ email, password }`                 |
| GET    | /api/auth/me          | Sí   | Devuelve el usuario autenticado       |
| PUT    | /api/auth/profile     | Sí   | `{ name?, avatarUrl? }`               |

Auth = envía el header `Authorization: Bearer <token>` (el token lo
devuelve `/register` y `/login`).

## Probar rápido con curl

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"David","email":"david@ceutec.hn","password":"123456"}'
```
