const jwt = require('jsonwebtoken');
const Calendar = require('../models/Calendar');
const Permission = require('../models/Permission');
const UserCalendar = require('../models/UserCalendar');
const CalendarDto = require('../dtos/CalendatDto');

class CalendarService {

    async checkPermissions(userId, calendarId) { 
//if user has permission to edit (permission_id 1 or permission_id 2) return true,
// if not: throw ApiError.badRequest('User has no permissions to work with this calendar.');

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
        
        
        
        //после создания перед return добавить айди юзера и календаря и permission_id 1 (это права создателя) в модель UserCalendars 
    }

    async updateCalendar(updatedFields, calendarId) { //look what rows has updated fields and update, return dto
        
        /* get calendar from db (const calendar = ...) and then:

        if (!calendar) {
            throw ApiError.badRequest('Calendar is not found');
        } 
        if (updatedFields.name) {
            calendar.name = updatedFields.name;
        }
        if (updatedFields.description) {
            calendar.description = updatedFields.description;
        }
        if (updatedFields.color) {
            calendar.color = updatedFields.color;
        } 

            ...

        const calendarDto = new CalendarDto(calendar, permission (нужно достать выше permission для календаря)) 
        return calendarDto*/
    }

    async deleteCalendar(id) { //delete, returns nothing
        //перед тем как удалять нужно очистить сначала CalendarEvents а потом UserCalendar с айдишкой этого календаря
        //а потом только удалять с таблицы календарь, если так не сделать то будет ошибка при удалении тк этот айди есть в других таблицах.
    }   

}

module.exports = new CalendarService();