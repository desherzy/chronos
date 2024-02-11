const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const User = require('./User');
const Event = require('./Event');

const UserEvent = sequelize.define('UserEvent', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
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
    tableName: 'user_events',
    timestamps: false
});

User.belongsToMany(Event, { through: UserEvent, foreignKey: 'user_id' });
Event.belongsToMany(User, { through: UserEvent, foreignKey: 'event_id' });

module.exports = UserEvent;