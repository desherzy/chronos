import React, { useEffect, useState } from 'react';
import '../styles/tailwind.css';
import Calendar from './Calendar';
import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import useCalendarStore from '../store/calendar';
import { useParams } from 'react-router-dom';
import EventsList from './EventsList';
import ParticipantsList from './ParticipantsList';
import { Plus } from 'lucide-react';
import CreateEventModal from './CreateEventModal';


function CalendarPage() {
    const { fetchCalendarEvents } = useCalendarStore();
    const { calendarId } = useParams();
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

    const handleOpenCreateEventModal = () => {
        setIsCreateEventModalOpen(true);
    };

    const handleCloseCreateEventModal = () => {
        setIsCreateEventModalOpen(false);
    };
    
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
                <EventsList/>
                    <Button
                        variant="solid"
                        bg="blue.100"
                        width="100%"
                        mb={4}
                        leftIcon={<Icon as={Plus} />}
                        onClick={handleOpenCreateEventModal}
                        >
                        Add Event
                    </Button>
                <ParticipantsList/>
                    <Button
                        variant="solid"
                        bg="green.100"
                        width="100%"
                        leftIcon={<Icon as={Plus} />}
                    >
                        Add Member
                    </Button>

            {isCreateEventModalOpen && (
                <CreateEventModal isOpen={isCreateEventModalOpen} onClose={handleCloseCreateEventModal} />
            )}
            </Box>
        </Flex>
    );
}

export default CalendarPage;