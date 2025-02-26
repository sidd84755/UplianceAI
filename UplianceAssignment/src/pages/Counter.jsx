// src/pages/Counter.jsx
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Stack } from '@mui/material';

function Counter() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("counter");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("counter", count);
  }, [count]);

  return (
    <Container>
      <Box my={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Counter Component
        </Typography>
        <Typography variant="h5">Count: {count}</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Button variant="contained" onClick={() => setCount(prev => prev + 1)}>
            Increment
          </Button>
          <Button variant="contained" onClick={() => setCount(prev => prev - 1)}>
            Decrement
          </Button>
          <Button variant="outlined" onClick={() => setCount(0)}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Counter;
