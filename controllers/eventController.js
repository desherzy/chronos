const ApiError = require('../exceptions/apiError');
const eventService = require('../services/eventService');
const calendarService = require("../services/calendarService");


class EventController {

    async getCalendarEvents(req, res, next) {
        try {
            const userId = req.user.id;
            const { calendarId } = req.body;

            await calendarService.checkPermissions(userId, calendarId);
            const events = await eventService.getCalendarEvents(calendarId);
            res.json(events);
        } catch (e) {
            next(e);
        }
    }

    async createEvent(req, res, next) {
        try {
            const userId = req.user.id;
            const { startTime, endTime, color, name, description, calendarId } = req.body;

            await calendarService.checkPermissions(userId, calendarId);
            const event = await eventService.createEvent(startTime, endTime, color, name, description, userId, calendarId);
            res.json(event);
        } catch (e) {
            next(e);
        }
    }

    async updateEvent(req, res, next) {
        try {
            const userId = req.user.id;
            const eventId = req.params.id;
            const updatedFields = req.body;
            const { calendarId } = req.body;
            
            await calendarService.checkPermissions(userId, calendarId);
            const event = await eventService.updateEvent(updatedFields, eventId);
            res.json(event);
        } catch (e) {
            next(e);
        }
    }

    async deleteEvent(req, res, next) {
        try {
            const userId = req.user.id;
            const eventId = req.params.id;
            const { calendarId } = req.body;

            await calendarService.checkPermissions(userId, calendarId);
            await eventService.deleteEvent(eventId);
            res.status(200).json({ message: 'Event is successfully removed' });
        } catch (e) {
            next(e);
        }
    }



}

module.exports = new EventController();