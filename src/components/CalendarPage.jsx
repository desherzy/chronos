import React, { useEffect } from 'react';
import '../styles/tailwind.css';
import Calendar from './Calendar';
import { Box, Flex } from '@chakra-ui/react';



function CalendarPage() {                          

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