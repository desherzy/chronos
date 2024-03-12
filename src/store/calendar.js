import { create } from 'zustand';
import $api from '../axios';

const useCalendarStore = create((set, get) => ({
  calendars: [],
  events: {},

  fetchCalendars: async () => {
    try {
      const response = await $api.get('/calendars/user');
      const data = await response.data;

      set({ calendars: data });
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  },

  deleteEvent: async (eventId, calendarId) => {
    try {
      const response = await $api.delete(`/events/${eventId}`, {
        data: { calendarId: calendarId }
      });

      if (response.status === 200) {
        set((state) => ({
          events: {
            ...state.events,
            [calendarId]: state.events[calendarId].filter((event) => event.id !== parseInt(eventId))
          }
        }));
    
      } else {
        console.error('Error deleting event:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  },

  createEvent: async (newEvent, calendarId) => {
    try {
      const response = await $api.post('/events', newEvent);
      const createdEvent = await response.data;

      const formattedEvent = {
          id: createdEvent.id,
          title: createdEvent.name,
          description: createdEvent.description,
          category: createdEvent.category,
          backgroundColor: createdEvent.color,
          start: createdEvent.startTime,
          end: createdEvent.endTime,
          allDay: false
      };

      set((state) => {
          const updatedEvents = {
              ...state.events,
              [calendarId]: [...(state.events[calendarId] || []), formattedEvent]
          };
          return { events: updatedEvents };
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  },

  fetchCalendarEvents: async (calendar) => {
    try {
      const response = await $api.get(`/events/${calendar}`);
      const events = await response.data;

      const formattedEvents = events.map(event => ({
          id: event.id,
          title: event.name,
          description: event.description,
          category: event.category,
          backgroundColor: event.color,
          start: event.startTime,
          end: event.endTime,
          allDay: false
      }));


      set((state) => ({
        events: {
          ...state.events,
          [calendar]: formattedEvents,
        },
      }));
    } catch (error) {
      console.error(`Error fetching events for calendar ${calendar}:`, error);
    }
  },

  getCalendarById: (calendarId) => {
    const { calendars } = set.getState();
    return calendars.find(calendar => calendar.id === calendarId);
  },

  getEventsByCalendarId: (calendarId) => {
    const { events } = get();
    return events[calendarId] || [];
  },
  
}));

export default useCalendarStore;