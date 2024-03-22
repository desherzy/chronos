import { Img, Text, Box, Image, Circle } from "@chakra-ui/react";
import React from "react";

function ParticipantCard({ user }) {
  
  return (
    <Box display="flex" alignItems="center" p={2}>
    <Circle size="40px" bg="gray.200" mr={4}>
      <Image src={user.profileImage} alt="img" w="full" h="full" objectFit="cover" />
    </Circle>
    <Box>
      <Text fontWeight="bold">{user.login}</Text>
      <Text fontSize="sm" color="gray.500">{user.permission}</Text>
    </Box>
  </Box>
  );
}

export default ParticipantCard;