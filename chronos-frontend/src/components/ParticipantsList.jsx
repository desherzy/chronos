import React, { useEffect } from 'react';
import ParticipantCard from "./ParticipantCard";
import { Box, List, ListItem, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useParticipantsStore from '../store/participants';


function ParticipantsList() {
  const { calendarId } = useParams();
  const { participantsByCalendarId, fetchCalendarUsers } = useParticipantsStore();

  useEffect(() => {
    fetchCalendarUsers(calendarId);
  }, [calendarId]);

  const participants = participantsByCalendarId[calendarId] || [];

  return (
    <Box>
      <Box textAlign="center" fontSize="xl" fontWeight="bold" mb={4}>Members</Box>
      <List overflowY="auto" height="30vh" spacing={4} paddingY={4}>
        {participants.map((participant) => (
         <ListItem key={participant.id} bg="#f1e8ff" padding={3} borderRadius={4}boxShadow="md">
            <ParticipantCard user={participant} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ParticipantsList;