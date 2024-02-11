const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    color: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'events',
    timestamps: false
});

module.exports = Event;