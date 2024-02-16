const jwt = require('jsonwebtoken');
const Calendar = require('../models/Calendar');
const Permission = require('../models/Permission');
const UserCalendar = require('../models/UserCalendar');
const CalendarDto = require('../dtos/CalendatDto');
const CalendarEvents = require('../models/CalendarEvent');
const ApiError = require('../exceptions/apiError');

class CalendarService {

    async checkPermissions(userId, calendarId) { 
        //if user has permission to edit (permission_id 1 or permission_id 2) return true,
        // if not: throw ApiError.badRequest('User has no permissions to work with this calendar.');
        try {
            const userCalendar = UserCalendar.findAll({where: {calendar_id: calendarId, user_id: userId}});
            if (userCalendar.permission_id == 1 || userCalendar.permission_id == 2) {
                return true;
            } else {
                throw ApiError.badRequest('User has no permissions to work with this calendar.');
            }
        } catch (error) {
            console.error('Failed to check permission:', error);
            throw error;
        }
    }

    async getUserCalendars(userId) {   //get calendars,then pass them to dto and return dtos 
        const userCalendars = await UserCalendar.findAll({
            where: { user_id: userId },
            include: [{ model: Calendar, include: Permission }]
        });

        // Преобразуем записи в объекты DTO, используя CalendarDto
        const calendarDTOs = userCalendars.map(userCalendar => {
            const calendar = userCalendar.Calendar;
            const permission = userCalendar.Permission;
            return new CalendarDto(calendar, permission ? permission.name : null);
        });

        return calendarDTOs;
    }

    async createCalendar(userId, name, description, color) { //create calendar and return dto
        try {
            const calendar = await Calendar.create({name: name, description: description, color: color});
            const calendarDto = new CalendarDto(calendar);

            //после создания перед return добавить айди юзера и календаря и permission_id 1 (это права создателя) в модель UserCalendars 
            const userCalendar = await UserCalendar.create({user_id: userId, calendar_id: calendarDto.id, permission_id: 1});

            return calendarDto;
        } catch (error) {
            console.error('Calendar not created:', error);
            throw error;
        }
    }

    async updateCalendar(updatedFields, calendarId) { //look what rows has updated fields and update, return dto
        try {
            const calendar = Calendar.findAll({where: {calendar_id: calendarId}});
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

            //permission (?)
            const userCalendar = await UserCalendar.findAll({where: {calendar_id: calendarId}});
            const calendarDto = new CalendarDto(calendar, userCalendar.permission_id);
            return calendarDto;
        } catch (error) {
            console.error('Calendar not updated:', error);
            throw error;
        }
    }

    async deleteCalendar(id) { //delete, returns nothing
        //перед тем как удалять нужно очистить сначала CalendarEvents а потом UserCalendar с айдишкой этого календаря
        //а потом только удалять с таблицы календарь, если так не сделать то будет ошибка при удалении тк этот айди есть в других таблицах.
        try {
            const calendar = await Calendar.findAll({where: {id: id}});
            if (!calendar) {
                throw ApiError.badRequest('Calendar exists');
            } else {
                const calendarEvents = await CalendarEvents.destroy({where: {calendar_id: id}});
                const userCalendar = await UserCalendar.destroy({where: {calendar_id: id}});
                calendar = await Calendar.destroy({where: {id: id}});
                console.log('Calendar[' + id + '] deleted');
            }
        } catch (error) {
            console.error('Calendar not deleted', error);
            throw error;
        }
    }   

}

module.exports = new CalendarService();