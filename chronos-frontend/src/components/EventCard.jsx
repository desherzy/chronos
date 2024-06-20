import { Box, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import moment from "moment";

function EventCard({ event }) {
 const bgColor = useColorModeValue("gray.100"); 

 return (
    <Box
    bg={bgColor}
    color="black"
    p={3}
    borderRadius="md"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    mb={2}
    boxShadow="md"
  >
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={1}>
        {event.title}
      </Text>
      <Text fontSize="sm">
        {moment(event.start).format("h:mm A")} -{" "}
        {moment(event.end).format("h:mm A")}
      </Text>
    </Box>
    <Tooltip label={event.description} aria-label="Event description">
      <Text fontSize="xs">{event.description.slice(0, 20) + "..."}</Text>
    </Tooltip>
  </Box>
 );
}

export default EventCard;