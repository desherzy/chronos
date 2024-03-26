const authService = require("../services/authService");
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/apiError');
const calendarService = require("../services/calendarService");


class CalendarController {

    async getUserCalendars(req, res, next) {
        try {
            const userId = req.user.id;
            const calendars = await calendarService.getUserCalendars(userId);
            res.json(calendars);
        } catch (e) {
            next(e);
        }
    }

    async createCalendar(req, res, next) {
        try {
            const userId = req.user.id;
            const { name, description, color } = req.body;
            const calendar = await calendarService.createCalendar(userId, name, description, color);
            res.json(calendar);
        } catch (e) {
            next(e);
        }
    }

    async updateCalendar(req, res, next) {
        try {
            const userId = req.user.id;
            const calendarId = req.params.id;
            const updatedFields = req.body;

            await calendarService.checkPermissions(userId, calendarId);
            const calendar = await calendarService.updateCalendar(updatedFields, calendarId);
            res.json(calendar);
        } catch (e) {
            next(e);
        }
    }

    async deleteCalendar(req, res, next) {
        try {
            const userId = req.user.id;
            const calendarId = req.params.id;

            await calendarService.checkPermissions(userId, calendarId);
            await calendarService.deleteCalendar(calendarId);
            res.status(200).json({ message: 'Calendar is successfully removed' });
        } catch (e) {
            next(e);
        }
    }

    async leaveCalendar(req, res, next) {
        try {
            const userId = req.user.id;
            const calendarId = req.params.id;

            await calendarService.leaveCalendar(userId, calendarId);
            res.status(200).json({ message: 'You have successfully left the calendar' });
        } catch (e) {
            next(e);
        }
    }



}

module.exports = new CalendarController();