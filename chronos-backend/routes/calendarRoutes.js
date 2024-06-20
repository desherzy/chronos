const Router = require('express').Router;
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const calendarController = require('../controllers/calendarController');
const router = new Router();

router.get('/user', authMiddleware, calendarController.getUserCalendars);
router.post('/', authMiddleware, calendarController.createCalendar);
router.post('/leave/:id', authMiddleware, calendarController.leaveCalendar);
router.patch('/:id', authMiddleware, calendarController.updateCalendar);
router.delete('/:id', authMiddleware, calendarController.deleteCalendar);

module.exports = router;