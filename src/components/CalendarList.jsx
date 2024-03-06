import React, { useEffect } from 'react';
import '../styles/tailwind.css';
import CalendarItem from './CalendarItem';
import useCalendarStore from '../store/calendar';



function CalendarList() {                          
    const { calendars, fetchCalendars } = useCalendarStore();

    useEffect(() => {
        const fetchData = async () => {
            await fetchCalendars();
        };
        fetchData();
    }, [fetchCalendars]);


    return (
        <div className="ml-[70px] mt-[15px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
           {calendars.map(calendar => (
                <CalendarItem key={calendar.id} calendar={calendar} />
            ))}
        </div>
    );
}

export default CalendarList;