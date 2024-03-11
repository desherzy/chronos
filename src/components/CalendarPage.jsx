import React, { useEffect } from 'react';
import '../styles/tailwind.css';
import Calendar from './Calendar';
import { Box, Flex } from '@chakra-ui/react';
import useCalendarStore from '../store/calendar';
import { useParams } from 'react-router-dom';


function CalendarPage() {
    const { fetchCalendarEvents } = useCalendarStore();
    const { calendarId } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchCalendarEvents(calendarId);
        };
        fetchData();
    }, [fetchCalendarEvents]);

    return (
        <Flex  direction={['column', 'row']} flexWrap="wrap" justify="center" className="ml-[70px]">
                  <Box w={['100%', '70%']} p={4}>
                <Calendar />
            </Box>

            <Box w={['100%', '30%']} p={4} className="calendar-settings">
                МЕСТО ДЛЯ НАСТРОЕК
            </Box>
        </Flex>
    );
}

export default CalendarPage;