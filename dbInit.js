const { sequelize } = require('./dbConfig');
const User = require('./models/User');
const Tokens = require('./models/Tokens');
const Links = require('./models/Links');
const Calendar = require('./models/Calendar');
const Event = require('./models/Event');
const Permission = require('./models/Permission');
const UserCalendar = require('./models/UserCalendar');
const CalendarEvent = require('./models/CalendarEvent');
const UserEvent = require('./models/UserEvent');
const Invitation = require('./models/Invitation');

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await User.sync({ alter: true });
        await Tokens.sync({ alter: true });
        await Links.sync({ alter: true });
        await Calendar.sync({ alter: true });
        await Event.sync({ alter: true });
        await Permission.sync({ alter: true });
        await UserCalendar.sync({ alter: true });
        await CalendarEvent.sync({ alter: true });
        await UserEvent.sync({ alter: true });
        await Invitation.sync({ alter: true });
        

        console.log('\nAll models synchronized successfully.');
    } catch (error) {
        console.error('\nUnable to connect to the database or synchronize models:', error);
    }
}

module.exports = initializeDatabase;