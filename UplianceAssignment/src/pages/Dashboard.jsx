import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid,
  Paper,
  Avatar,
  LinearProgress
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { deepPurple } from '@mui/material/colors';

function parseJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    return {};
  }
}

function Dashboard() {
  const [userName, setUserName] = useState('');
  const [counterData, setCounterData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all counter data and user info
  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      try {
        const decoded = parseJWT(token);
        const userSub = decoded.sub;
        const userData = JSON.parse(localStorage.getItem(`userData_${userSub}`));
        setUserName(userData?.name || 'User');
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }

    // Get all counter values from localStorage
    const allCounters = Object.entries(localStorage)
      .filter(([key]) => key.startsWith('counter_'))
      .map(([key, value]) => {
        const userId = key.replace('counter_', '');
        const userData = JSON.parse(localStorage.getItem(`userData_${userId}`));
        return {
          userId,
          name: userData?.name || 'Unknown User',
          count: parseInt(value, 10)
        };
      });

    setCounterData(allCounters);
    setLoading(false);
  }, []);

  // Refresh data every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCounters = Object.entries(localStorage)
        .filter(([key]) => key.startsWith('counter_'))
        .map(([key, value]) => {
          const userId = key.replace('counter_', '');
          const userData = JSON.parse(localStorage.getItem(`userData_${userId}`));
          return {
            userId,
            name: userData?.name || 'Unknown User',
            count: parseInt(value, 10)
          };
        });
      setCounterData(updatedCounters);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>
            {userName[0]}
          </Avatar>
          <Typography variant="h4">
            Welcome, {userName}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Counter Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={counterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Counter Trends
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={counterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                User Contribution
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={counterData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                User Statistics
              </Typography>
              <Box sx={{ overflow: 'auto', maxHeight: 300 }}>
                {counterData.map((user, index) => (
                  <Box key={user.userId} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: 1,
                    bgcolor: index % 2 ? 'action.hover' : 'background.paper'
                  }}>
                    <Typography>{user.name}</Typography>
                    <Typography fontWeight="bold">{user.count}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;