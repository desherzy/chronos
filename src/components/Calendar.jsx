import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, Select } from "@chakra-ui/react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import "../index.css";

function Calendar() {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const [isEventInfoModalOpen, setIsEventInfoModalOpen] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventColor, setEventColor] = useState('');

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
    }

    function handleCreateEvent() {
        const newEvent = {
            title: eventName,
            descr: eventDescription,
            backgroundColor: eventColor,
            start: selectedEvent.start,
            end: selectedEvent.end,
            allDay: selectedEvent.allDay
        };
        setCurrentEvents([...currentEvents, newEvent]);
        setIsCreateEventModalOpen(false);
    }

    function handleDeleteEvent() {

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

            {/* Create Event Modal */}
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
                            <FormLabel>Color</FormLabel>
                            <Select value={eventColor} onChange={(e) => setEventColor(e.target.value)}>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                {/* Add more color options as needed */}
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

            {/* Event Info Modal */}
            <Modal isOpen={isEventInfoModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Event Information</ModalHeader>
                    <ModalBody>
                      <p>Title: {selectedEvent?.title}</p>
                      <p>Description: {selectedEvent?.descr}</p>
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