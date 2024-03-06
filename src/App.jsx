import './index.css';
import Calendar from './components/Calendar';
import useAuthStore from './store/auth';
import Registration from './components/Registration';
import Login from './components/Login';
import MainPage from './components/MainPage';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PrivateRoute from './components/PrivateRoute';
import { ChakraProvider } from '@chakra-ui/react'
import Sidebar from './components/Sidebar';
import ProfileSettings from './components/ProfileSettings';
import Invitations from './components/Invitations';
import CalendarList from './components/CalendarList';
import CalendarPage from './components/CalendarPage';

function App() {
  const { isAuthenticated, emailConfirmed, refreshUser } = useAuthStore();
  const [isCheckingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (localStorage.getItem('token')) {
          await refreshUser();
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setCheckingAuth(false);
      }
    };
    console.log("CHECKIN AUTH");
    checkAuth();
  }, [refreshUser]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!emailConfirmed && isAuthenticated) {
    return (
      <div>
        Please confirm your email to access the application.
      </div>
    );
  }

  return (
    <ChakraProvider>
      <BrowserRouter>
      {isAuthenticated && <Sidebar />}
        <Routes>
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/settings' element={<PrivateRoute> <ProfileSettings /> </PrivateRoute>} />
          <Route path='/invitations' element={<PrivateRoute> <Invitations /> </PrivateRoute>} />
          <Route path="/calendars" element={<PrivateRoute> <CalendarList/> </PrivateRoute>} />
          <Route path="/calendars/:userId" element={<PrivateRoute> <CalendarPage/> </PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
