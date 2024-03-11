import { create } from 'zustand';
import $api from '../axios';

const useCalendarStore = create((set) => ({
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

  createEvent: async (newEvent, calendarId) => {
    try {
      const response = await $api.post('/events', newEvent);
      const data = await response.data;

      const currentState = set.getState();
      const updatedEvents = {
        ...currentState.events,
        [calendarId]: [...(currentState.events[calendarId] || []), data]
      };

      set({ events: updatedEvents });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  },

  fetchCalendarEvents: async (calendar) => {
    try {
      const response = await $api.get(`/events/${calendar}`);
      const data = await response.data;


      set((state) => ({
        events: {
          ...state.events,
          [calendar]: data,
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
  
  getEventsByCalendarId: (calendarId, { getState }) => {
    const { events } = getState();
    return events[calendarId] || [];
  }
  
}));

export default useCalendarStore;