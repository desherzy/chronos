const express = require('express');
const schedule = require('node-schedule');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const initializeDatabase = require('./dbInit');
const app = express();
const path = require('path');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const calendarRouter = require('./routes/calendarRoutes');
const invitationRouter = require('./routes/invitationRoutes');
const userRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const fileUpload = require('express-fileupload');
const eventService = require('./services/eventService');

initializeDatabase();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
  };


app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use('/usersAvatars', express.static(path.join(__dirname, 'usersAvatars')));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors(corsOptions));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/calendars', calendarRouter);
app.use('/api/invitation', invitationRouter);
app.use(errorMiddleware);


schedule.scheduleJob('*/1 * * * *', () => {
  eventService.checkEventsAndSendReminders();
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});