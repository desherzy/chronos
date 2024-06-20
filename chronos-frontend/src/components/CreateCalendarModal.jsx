import React, { useRef, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    ModalFooter
  } from "@chakra-ui/react";
import useCalendarStore from '../store/calendar';

function CreateCalendarModal({ isOpen, onClose }) {
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const { createCalendar } = useCalendarStore();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#9389b8");
  
    async function handleCalendar() {
      try {
        await createCalendar({ name, description, color });
        console.log("\n WE INSIDE")
        onClose();
      } catch (error) {
        console.error("Error creating calendar:", error);
      }
    }
  
    return (
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Calendar</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="description" mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl id="color" mb={4}>
              <FormLabel>Color</FormLabel>
                <Input
                  type="color"
                  defaultValue={color}
                  size="sm"
                  w="100%"
                  h="30px"
                  onChange={(e) => setColor(e.target.value)}
                />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button bgColor="#d8d8d8" mr={3} ref={finalRef} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCalendar} bgColor="#a5ffbd">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}

export default CreateCalendarModal;