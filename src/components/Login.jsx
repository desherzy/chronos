import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loginUser, isAuthenticated, error } = useAuthStore();
    const [loginSuccess, setLoginSuccess] = useState(false);

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
    }};

    return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Log in</button>
        </form>
        {error && <p>{error.message || 'Login failed'}</p>}
    </div>
    );
}

export default Login;