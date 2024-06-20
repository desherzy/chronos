import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function MainPage() {

  return (
      <Box
        bg="linear-gradient(120deg, rgba(250,250,250,1) 0%, rgba(220,220,220,1) 50%, rgba(200,200,200,1) 100%)"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <img src="https://www.svgrepo.com/show/7076/monthly-calendar.svg" alt="Calendar icon" width="80" height="80" />
        <Heading mt={6} fontSize="4xl" color="gray.800">
          Chronos
        </Heading>
        <Text mt={8} fontSize="xl" color="gray.800" maxW="600px">
          Manage your appointments, events, and personal time-table with ease. Stay organized
          and never miss a deadline again.
        </Text>
        <Link to="/login">
          <Button
            mt={8}
            colorScheme='purple'
            color="white"
            padding="8px 32px"
            fontSize="lg"
            borderRadius="md"
            boxShadow="md"
            _hover={{ bg: 'teal.600' }}
            _focus={{ boxShadow: 'none' }}
          >
            Get Started
          </Button>
        </Link>
      </Box>
  );
}

export default MainPage;