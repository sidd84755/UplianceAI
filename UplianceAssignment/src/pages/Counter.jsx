import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Stack } from '@mui/material';

function parseJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return {};
  }
}

function Counter() {
  const [userId, setUserId] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      try {
        const decoded = parseJWT(token);
        setUserId(decoded.sub);
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const savedCount = localStorage.getItem(`counter_${userId}`);
      setCount(savedCount ? parseInt(savedCount, 10) : 0);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`counter_${userId}`, count);
    }
  }, [count, userId]);

  const bgHeight = Math.min(count * 2, 100);
  const bgColor = `rgba(33, 150, 243, ${Math.min(count * 0.02, 0.7)})`;

  return (
    <Container sx={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: `${bgHeight}%`,
        backgroundColor: bgColor,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: -1
      }} />

      <Box my={4} textAlign="center" position="relative">
        <Typography variant="h4" gutterBottom>
          Counter Component
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Count: {count}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mb: 4 }}>
          (User ID: {userId})
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button 
            variant="contained" 
            onClick={() => setCount(prev => prev + 1)}
            sx={{ fontWeight: 'bold' }}
          >
            Increment
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setCount(prev => Math.max(0, prev - 1))}
            disabled={count === 0}
          >
            Decrement
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setCount(0)}
            disabled={count === 0}
            color="error"
          >
            Reset
          </Button>
        </Stack>

        <Typography variant="body2" sx={{ mt: 4, opacity: 0.7 }}>
          Background level: {bgHeight}%
        </Typography>
      </Box>
    </Container>
  );
}

export default Counter;