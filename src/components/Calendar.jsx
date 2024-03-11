import { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, Select } from "@chakra-ui/react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import "../index.css";
import { useParams } from 'react-router-dom';
import useCalendarStore from '../store/calendar';

function Calendar() {
    const { createEvent, getEventsByCalendarId } = useCalendarStore();
    const [currentEvents, setCurrentEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const [isEventInfoModalOpen, setIsEventInfoModalOpen] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventColor, setEventColor] = useState('');
    const [eventCategory, setEventCategory] = useState('reminder');
    const { calendarId } = useParams();
  
    useEffect(() => {
        const selectEvents = async () => {
            const calendar = await useCalendarStore.getState().getEventsByCalendarId(calendarId, { getState: useCalendarStore.getState });
            const formattedEvents = calendar.map(event => ({
                title: event.name,
                description: event.description,
                category: event.category,
                backgroundColor: event.color,
                start: event.startTime,
                end: event.endTime,
                allDay: false
            }));
            setCurrentEvents([...formattedEvents]);
            console.log("CURRENT:         ");
            console.log(currentEvents);
            console.log(" STOP CUR         ");
        }

        selectEvents();
      }, [calendarId]);

    function handleDateSelect(selectInfo) {
        setSelectedEvent({
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
        });
        setIsCreateEventModalOpen(true);
    }

    function handleEventClick(clickInfo) {
        setSelectedEvent(clickInfo.event);
        setIsEventInfoModalOpen(true);
    }

    function handleEvents(events) {
        setCurrentEvents(events);
    }

    function handleCloseModal() {
        setIsCreateEventModalOpen(false);
        setIsEventInfoModalOpen(false);
        setSelectedEvent(null);
        setEventName('');
        setEventDescription('');
        setEventColor('');
        setEventCategory('reminder');
    }

    async function handleCreateEvent() {
        const newEvent = {
            title: eventName,
            description: eventDescription,
            category: "1",
            backgroundColor: eventColor,
            start: selectedEvent.start,
            end: selectedEvent.end,
            calendarId: calendarId,
            allDay: selectedEvent.allDay
        };
        await createEvent(newEvent, calendarId); 
        setCurrentEvents([...currentEvents, newEvent]);
        setIsCreateEventModalOpen(false);
    }

    function handleDeleteEvent() {
        const updatedEvents = currentEvents.filter(event => event.title !== selectedEvent.title);
        setCurrentEvents(updatedEvents);


        console.log(updatedEvents);
        setIsEventInfoModalOpen(false);
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                aspectRatio={1.5}
                height='100vh'
                contentHeight={400}
                windowResize={() => console.log('window was resized')}
                select={handleDateSelect}
                eventClick={handleEventClick}
                events={currentEvents}
            />

         
            <Modal isOpen={isCreateEventModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Event</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input value={eventName} onChange={(e) => setEventName(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Category</FormLabel>
                            <Select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}>
                                <option value="reminder">Reminder</option>
                                <option value="task">Task</option>
                                <option value="arrangement">Arrangement</option>
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Color</FormLabel>
                            <Select value={eventColor} onChange={(e) => setEventColor(e.target.value)}>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                           
                            </Select>
                        </FormControl>
                        <p>Start: {selectedEvent?.start}</p>
                        <p>End: {selectedEvent?.end}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleCreateEvent}>
                            Save
                        </Button>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        
            <Modal isOpen={isEventInfoModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Event Information</ModalHeader>
                    <ModalBody>
                      <p>Title: {selectedEvent?.title}</p>
                      <p>Description: {selectedEvent?.extendedProps?.description}</p>
                      <p>Category: {selectedEvent?.extendedProps?.category}</p>
                      <p>Color: {selectedEvent?.backgroundColor}</p>
                      <p>Start: {selectedEvent?.start?.toLocaleString()}</p>
                      <p>End: {selectedEvent?.end?.toLocaleString()}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleDeleteEvent}>
                            Delete Event
                        </Button>
                        <Button onClick={handleCloseModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Calendar;