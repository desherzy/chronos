const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const Calendar = require('./Calendar');
const Event = require('./Event');

const CalendarEvent = sequelize.define('CalendarEvent', {
    calendar_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Calendar,
            key: 'id'
        }
    },
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Event,
            key: 'id'
        }
    }
}, {
    tableName: 'calendar_events',
    timestamps: false
});


Calendar.belongsToMany(Event, { through: CalendarEvent, foreignKey: 'calendar_id' });
Event.belongsToMany(Calendar, { through: CalendarEvent, foreignKey: 'event_id' });

module.exports = CalendarEvent;