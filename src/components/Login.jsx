import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react'
import { Center, Alert, AlertIcon, VStack, Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loginUser, isAuthenticated, error } = useAuthStore();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
    if (isAuthenticated === true) {
        navigate("/calendars", {replace: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
    if (loginSuccess) {
        navigate('/calendars');
    }
    }, [loginSuccess, navigate]);


    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await loginUser(formData);
        setLoginSuccess(true);
    } catch (error) {
        console.error('Error logging in:', error);
        setShowAlert(true);
    }};

    return (
        <Center h="100vh">
            <Box borderWidth='1px' borderRadius='lg' p={8} backgroundColor='#E2E8F0'>
                <Heading textAlign='center' mb={4} >Login</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                        </FormControl>
                        {showAlert && (
                            <Alert status="error" mb={4} borderWidth='1px' borderRadius='lg'>
                                <AlertIcon />
                                {error.message || 'Login failed'}
                            </Alert>
                        )}
                        <Button colorScheme="purple" type="submit">
                            Login
                        </Button>
                    </VStack>
                </form>
                <Center h="10vh">
                    <Box>
                        <ChakraLink as={ReactRouterLink} to='/registration'>
                            Don't have an account? Register here.
                        </ChakraLink>
                    </Box>
                </Center>
            </Box>
        </Center>
    );
}

export default Login;