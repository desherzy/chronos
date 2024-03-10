const CalendarEvent = require('../models/CalendarEvent');
const EventDto = require('../dtos/EventDto');
const Event = require('../models/Event');
const UserEvent = require('../models/UserEvent');

class EventService {

    async getCalendarEvents(calendarId) {
        const calendarEvents = await CalendarEvent.findAll({ where: { calendar_id: calendarId } });
        const eventIds = calendarEvents.map(event => event.event_id);
        const events = await Event.findAll({ where: { id: eventIds } });
        const eventDTOs = events.map(event => new EventDto(event));

        return eventDTOs;
    }

    async createEvent(startTime, endTime, color, name, description, category, userId, calendarId) {
        const newEvent = await Event.create({
            start_time: startTime,
            end_time: endTime,
            category: category,
            color: color,
            name: name,
            description: description
        });

        await CalendarEvent.create({
            calendar_id: calendarId,
            event_id: newEvent.id
        });

        await UserEvent.create({
            user_id: userId,
            event_id: newEvent.id
        })

        const eventDto = new EventDto(newEvent);
        return eventDto;
    }

    async updateEvent(updatedFields, eventId) {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw ApiError.badRequest('Event is not found');
        }

        if (updatedFields.startTime) {
            event.start_time = updatedFields.startTime;
        }
        if (updatedFields.endTime) {
            event.end_time = updatedFields.endTime;
        }
        if (updatedFields.color) {
            event.color = updatedFields.color;
        }
        if (updatedFields.name) {
            event.name = updatedFields.name;
        }
        if (updatedFields.description) {
            event.description = updatedFields.description;
        }
        await event.save();

        const eventDto = new EventDto(event);
        return eventDto;
    }

    async deleteEvent(eventId) {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw ApiError.badRequest('Event is not found');
        }

        await CalendarEvent.destroy({ where: { event_id: eventId } });
        await UserEvent.destroy({ where: { event_id: eventId } });

        await Event.destroy({ where: { id: eventId } });
    }

}

module.exports = new EventService();