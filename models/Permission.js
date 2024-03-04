const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');

const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'permissions',
    timestamps: false
});


module.exports = Permission;