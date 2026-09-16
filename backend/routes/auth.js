const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../Modelos/Usuario');
const { requireAuth, signToken } = require('../middleware/auth');

const router = express.Router();

function toPublicUser(usuario) {
    return {
        id: usuario.id,
        name: usuario.nombre,
        email: usuario.email,
        avatarUrl: usuario.avatarUrl || undefined
    };
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Nombre, correo y contraseña son obligatorios.'
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: 'La contraseña debe tener al menos 6 caracteres.'
            });
        }

        // select * from Usuario where email = ?;
        const existente = await Usuario.findOne({ where: { email } });
        if (existente) {
            return res.status(409).json({
                message: 'Ya existe una cuenta con ese correo.'
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // insert into Usuario (nombre, email, passwordHash) values (?, ?, ?);
        const usuario = await Usuario.create({ nombre: name, email, passwordHash });

        const token = signToken(usuario.id);
        res.status(201).json({ token, user: toPublicUser(usuario) });

    } catch (error) {
        res.status(500).json({
            message: 'Error al registrar el usuario',
            error: error.message
        });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Correo y contraseña son obligatorios.'
            });
        }

        // select * from Usuario where email = ?;
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({
                message: 'Credenciales incorrectas.'
            });
        }

        const passwordOk = await bcrypt.compare(password, usuario.passwordHash);
        if (!passwordOk) {
            return res.status(401).json({
                message: 'Credenciales incorrectas.'
            });
        }

        const token = signToken(usuario.id);
        res.status(200).json({ token, user: toPublicUser(usuario) });

    } catch (error) {
        res.status(500).json({
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
});

// GET /api/auth/me  (requiere token)
router.get('/me', requireAuth, async (req, res) => {
    try {
        // select * from Usuario where id = ?;
        const usuario = await Usuario.findByPk(req.userId);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({ user: toPublicUser(usuario) });

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el usuario',
            error: error.message
        });
    }
});

// PUT /api/auth/profile  (requiere token) — usado por EditProfileScreen
router.put('/profile', requireAuth, async (req, res) => {
    try {
        const { name, avatarUrl } = req.body;
        const cambios = {};
        if (typeof name === 'string' && name.trim()) cambios.nombre = name.trim();
        if (typeof avatarUrl === 'string') cambios.avatarUrl = avatarUrl;

        // update Usuario set nombre = ?, avatarUrl = ? where id = ?;
        const [actualizado] = await Usuario.update(cambios, { where: { id: req.userId } });

        if (!actualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const usuario = await Usuario.findByPk(req.userId);
        res.status(200).json({ user: toPublicUser(usuario) });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el perfil',
            error: error.message
        });
    }
});

module.exports = router;
