import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import $api from '../axios';

const useParticipantsStore = create(
  persist(
    (set, get) => ({
      participantsByCalendarId: {},


      fetchCalendarUsers: async (calendarId) => {
        try {
          const response = await $api.get(`/users/calendar/${calendarId}`);
          const users = response.data;
          set((state) => ({
            participantsByCalendarId: {
              ...state.participantsByCalendarId,
              [calendarId]: users,
            },
          }));
        } catch (error) {
          console.error('Error fetching participants:', error);
        }
      },
    }),

    {
      name: 'participants-store',
      getStorage: () => localStorage,
    }
  )
);

export default useParticipantsStore;