const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const User = require('./User');

const Tokens = sequelize.define('Tokens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'tokens',
    timestamps: false
});

module.exports = Tokens;