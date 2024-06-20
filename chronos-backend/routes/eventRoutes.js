const Router = require('express').Router;
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const calendarController = require('../controllers/calendarController');
const eventController = require('../controllers/eventController');
const router = new Router();

router.get('/:id', authMiddleware, eventController.getCalendarEvents);
router.post('/', authMiddleware, eventController.createEvent);
router.patch('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;