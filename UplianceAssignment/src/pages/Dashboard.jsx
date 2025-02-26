import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Button, Typography, Link } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Link component={RouterLink} to="/userdata" variant="button">
            User Data
          </Link>
          <Link component={RouterLink} to="/counter" variant="button">
            Counter
          </Link>
        </Box>
        <Box mt={4}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
