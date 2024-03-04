const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const initializeDatabase = require('./dbInit');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const calendarRouter = require('./routes/calendarRoutes');
const invitationRouter = require('./routes/invitationRoutes');
const userRouter = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

initializeDatabase();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
  };


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/calendars', calendarRouter);
app.use('/api/invitation', invitationRouter);
app.use(errorMiddleware);


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});