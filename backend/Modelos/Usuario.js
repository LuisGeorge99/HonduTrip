const sequelize = require('../db/connection');

const { DataTypes } = require('sequelize');


const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatarUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'Usuario',
    timestamps: false
});

module.exports = Usuario;
