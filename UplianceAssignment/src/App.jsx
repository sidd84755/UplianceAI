import React from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Userdata from './pages/Userdata';
import Counter from './pages/Counter';
import ProtectedRoute from './components/ProtectedRoute';

import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppBar, Toolbar, Typography, Button, Container, Box, CircularProgress } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function App() {

  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      try {
        const decoded = parseJWT(token);
        const userSub = decoded.sub;
        // Clear user-specific data
        localStorage.removeItem(`userData_${userSub}`);
        localStorage.removeItem(`counter_${userSub}`);
      } catch (error) {
        console.error('Error during logout cleanup:', error);
      }
    }
    // Clear authentication token
    localStorage.removeItem('googleToken');
    navigate('/');
  };

  const NAVIGATION = [
    { kind: 'header', title: 'Main items' },
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon style={{ fill: '#3B208E' }}/>,
    },
    {
      segment: 'userdata',
      title: 'Profile',
      icon: <AccountBoxIcon style={{ fill: '#3B208E' }}/>,
    },
    {
      segment: 'counter',
      title: 'Counter',
      icon: <AddCircleIcon style={{ fill: '#3B208E' }}/>,
    },
    { kind: 'divider' },
      {
        kind: 'button',
        title: 'Logout',
        icon: <LogoutIcon style={{ fill: '#FF0000' }} />,
        onClick: handleLogout,
      },
  ];
  
  const demoTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <AppProvider // wrap with appprovider for the sidebar layout
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: <img src="https://upliance.ai/cdn/shop/files/purple_upliance.png?height=84&v=1705328918" alt="MUI logo" />,
        title: '',
      }}
    >
      <Routes>
        {/* Public route - Login page without sidebar */}
        <Route path="/" element={<Login />} />

        {/* Protected routes - Requires authentication */}
        <Route element={<ProtectedRoute />}>
          <Route element={
            <DashboardLayout defaultSidebarCollapsed>
              <Outlet /> {/* This is where protected child routes will render */}
            </DashboardLayout>
          }>
            {/* Dashboard route */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Userdata route */}
            <Route path="/userdata" element={<Userdata />} />
            {/* Counter route */}
            <Route path="/counter" element={<Counter />} />
          </Route>
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;