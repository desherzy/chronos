const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const Calendar = require('./Calendar');
const User = require('./User');
const Permission = require('./Permission');

const UserCalendar = sequelize.define('UserCalendar', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    calendar_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Calendar,
            key: 'id'
        }
    },
    permission_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'id'
        }
    }
}, {
    tableName: 'user_calendars',
    timestamps: false
});

module.exports = UserCalendar;