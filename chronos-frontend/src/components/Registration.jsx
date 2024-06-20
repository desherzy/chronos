import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react'
import { Center, VStack, Box, Alert, AlertIcon, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: '',  email: '', password: '' });
  const { registerUser, error, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated === true) {
        navigate("/calendars", {replace: true});
    }
    }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      console.log('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  return (
    <Center h="100vh">
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' p={8} backgroundColor='#E2E8F0'>
        <Heading textAlign='center' mb={4} >Register</Heading>
          <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                  <FormControl id="login">
                      <FormLabel>Login</FormLabel>
                      <Input type="text" name="login" value={formData.login} onChange={handleChange} placeholder="Login" />
                  </FormControl>
                  <FormControl id="email">
                      <FormLabel>Email address</FormLabel>
                      <Input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                  </FormControl>
                  <FormControl id="password">
                      <FormLabel>Password</FormLabel>
                      <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                  </FormControl>
                  <Button colorScheme="purple" type="submit">
                      Create an account
                  </Button>
              </VStack>
          </form>
            <Center h="10vh">
                <Box>
                    <ChakraLink as={ReactRouterLink} to='/login'>
                        Already have an account? Login here.
                    </ChakraLink>
                </Box>
            </Center>
        </Box>
    </Center>
  );
}

export default Registration;