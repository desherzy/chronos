import React, { useEffect, useState } from 'react';
import useCalendarStore from '../store/calendar';
import { useParams } from 'react-router-dom';
import EventCard from './EventCard';
import { Box, Input, Text } from "@chakra-ui/react";

function EventsList() {
 const { calendarId } = useParams();
 const events = useCalendarStore((state) => state.events[calendarId] || []);
 const [search, setSearch] = useState("");

 const filteredEvents = events.filter((event) =>
  event.title.toLowerCase().includes(search.toLowerCase())
 );
 
 return (
  <Box>
  <Box display="flex" justifyContent="space-between" mb={4}>
    <Text fontSize="xl" fontWeight="bold">
      Events
    </Text>
    <Input
      type="text"
      placeholder="Search events"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </Box>
  <Box overflowY="auto" height="40vh">
    {filteredEvents.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </Box>
</Box>
 );
}

export default EventsList;