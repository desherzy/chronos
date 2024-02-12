const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const initializeDatabase = require('./dbInit');
const app = express();
const authRouter = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

initializeDatabase();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use(errorMiddleware);


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});