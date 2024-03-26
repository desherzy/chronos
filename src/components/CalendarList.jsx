import React, { useEffect } from 'react';
import '../styles/tailwind.css';
import CalendarItem from './CalendarItem';
import useCalendarStore from '../store/calendar';
import CreateCalendarButton from './CreateCalendarButton';



function CalendarList() {                          
    const { calendars, fetchCalendars } = useCalendarStore();

    useEffect(() => {
        const fetchData = async () => {
            await fetchCalendars();
        };
        fetchData();
    }, [fetchCalendars]);


    return (
        <div>
            <div className="ml-[70px] mt-[15px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {calendars.map(calendar => (
                    <CalendarItem key={calendar.id} calendar={calendar} />
                ))}
            </div>
            <div className="fixed bottom-7 right-7 m-4">
                <CreateCalendarButton />
            </div>
        </div>
    );
}

export default CalendarList;