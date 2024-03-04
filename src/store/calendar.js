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

  fetchEvents: async (calendarId) => {
    try {
      const response = await $api.get(`/events/`);
      const data = await response.data;


      set((state) => ({
        events: {
          ...state.events,
          [calendarId]: data,
        },
      }));
    } catch (error) {
      console.error(`Error fetching events for calendar ${calendarId}:`, error);
    }
  },

  getCalendarById: (calendarId) => {
    const { calendars } = set.getState();
    return calendars.find(calendar => calendar.id === calendarId);
  },

  getEventsByCalendarId: (calendarId) => {
    const { events } = set.getState();
    return events[calendarId] || [];
  }
}));

export default useCalendarStore;