import React, {  useState } from 'react';
import useCalendarStore from '../store/calendar';
import { useParams } from 'react-router-dom';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input, Textarea, Select, Button } from "@chakra-ui/react";

function CreateEventModal({isOpen, onClose}) {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventColor, setEventColor] = useState('');
    const [eventCategory, setEventCategory] = useState('reminder');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('')
    const { calendarId } = useParams();
    const { createEvent } = useCalendarStore();


    const handleSave = async () => {
        const newEvent = {
            title: eventName,
            description: eventDescription,
            category: eventCategory,
            backgroundColor: eventColor,
            start: start,
            end: end,
            calendarId: calendarId
        };
        await handleCreateEvent(newEvent);
        onClose();
    };

    async function handleCreateEvent() {
        const newEvent = {
            title: eventName,
            description: eventDescription,
            category: "1",
            backgroundColor: eventColor,
            start: start,
            end: end,
            calendarId: calendarId
        };
        await createEvent(newEvent, calendarId);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
                <FormControl mt={4}>
                        <FormLabel>Start</FormLabel>
                        <Input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>End</FormLabel>
                        <Input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
                    </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSave}>
                    Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    );
}

export default CreateEventModal;