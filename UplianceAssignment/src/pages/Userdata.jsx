// src/pages/Userdata.jsx
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';

function Userdata() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("googleToken");
    setUserData(token);
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          User Data
        </Typography>
        {userData ? (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="body1">{userData}</Typography>
          </Paper>
        ) : (
          <Typography variant="body1">No user data found.</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Userdata;
