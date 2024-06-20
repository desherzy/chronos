const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const User = require('./User');
const Calendar = require('./Calendar');
const Permission = require('./Permission');

const Invitation = sequelize.define('Invitation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    invited_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    inviter_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    calendar_id: {
        type: DataTypes.INTEGER,
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
    },
    accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
    }
}, {
    tableName: 'invitations',
    timestamps: false
});

module.exports = Invitation;