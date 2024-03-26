import React from 'react';
import { Button, useDisclosure } from "@chakra-ui/react";
import CreateCalendarModal from './CreateCalendarModal';
import { Add, CalendarPlus2 } from "lucide-react";

function CreateCalendarButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <Button
      bg="#9389b8"
      variant="solid"
      onClick={onOpen}
      w="59px"
      h="59px"
      borderRadius="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CalendarPlus2 size={64} />
    </Button>
    <CreateCalendarModal isOpen={isOpen} onClose={onClose} />
  </>
  );
}



export default CreateCalendarButton;