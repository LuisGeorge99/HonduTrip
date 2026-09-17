require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db/connection');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ ok: true, service: 'hondutrip-backend' });
});

app.use('/api/auth', authRoutes);

// Manejador de errores genérico
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor.' });
});

const PORT = process.env.PORT || 4000;

// Crea la tabla Usuario en MySQL si todavía no existe (equivalente a
// correr el CREATE TABLE a mano en phpMyAdmin).
sequelize.sync()
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`HondurTrip backend corriendo en http://0.0.0.0:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('No se pudo sincronizar la base de datos:', error.message);
    });
