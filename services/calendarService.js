const jwt = require('jsonwebtoken');
const Calendar = require('../models/Calendar');
const Permission = require('../models/Permission');
const UserCalendar = require('../models/UserCalendar');
const CalendarDto = require('../dtos/CalendatDto');
const CalendarEvents = require('../models/CalendarEvent');
const ApiError = require('../exceptions/apiError');

class CalendarService {

    async checkPermissions(userId, calendarId) { 
        try {
            const userCalendar = await UserCalendar.findOne({where: {calendar_id: calendarId, user_id: userId}});
            if (userCalendar.permission_id == 1 || userCalendar.permission_id == 2) {
                return true;
            } else {
                throw ApiError.badRequest('User has no permissions to work with this calendar.');
            }
        } catch (error) {
            throw error;
        }
    }

    async getUserCalendars(userId) {  
        const userCalendars = await UserCalendar.findAll({
            where: { user_id: userId },
            include: [
                { model: Calendar },
                { model: Permission }
            ]
        });

        const calendarDTOs = userCalendars.map(userCalendar => {
            const calendar = userCalendar.Calendar;
            const permission = userCalendar.Permission;
            return new CalendarDto(calendar, permission ? permission.name : null);
        });

        return calendarDTOs;
    }

    async createCalendar(userId, name, description, color) {
        try {
            const calendar = await Calendar.create({name: name, description: description, color: color});
            const calendarDto = new CalendarDto(calendar, 1);

            await UserCalendar.create({user_id: userId, calendar_id: calendarDto.id, permission_id: 1});

            return calendarDto;
        } catch (error) {
            throw error;
        }
    }

    async updateCalendar(updatedFields, calendarId) {
        try {
            const calendar = Calendar.findOne({where: {id: calendarId}});
            if (!calendar) {
                throw ApiError.badRequest('Calendar is not found');
            }

            if (updatedFields.name) {
                calendar.name = updatedFields.name;
            }
            if (updatedFields.description) {
                calendar.calendar = updatedFields.description;
            }
            if (updatedFields.color) {
                calendar.color = updatedFields.color;
            }

            await calendar.save();

            const calendarDto = new CalendarDto(calendar);
            return calendarDto;
        } catch (error) {
            throw error;
        }
    }

    async deleteCalendar(id) {
        try {
            const calendar = await Calendar.findOne({where: {id: id}});

            if (!calendar) {
                throw ApiError.badRequest('Calendar exists');
            } else {
                await CalendarEvents.destroy({where: {calendar_id: id}});
                await UserCalendar.destroy({where: {calendar_id: id}});
                await Calendar.destroy({where: {id: id}}); 
            }
        } catch (error) {
            throw error;
        }
    }   

}

module.exports = new CalendarService();