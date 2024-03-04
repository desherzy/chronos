import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/auth';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: '',  email: '', password: '' });
  const { registerUser, error, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated === true) {
        navigate("/calendars", {replace: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="login" value={formData.login} onChange={handleChange} placeholder="login" />
        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Registration;