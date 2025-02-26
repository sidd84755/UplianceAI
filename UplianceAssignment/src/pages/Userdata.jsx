import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';

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

function Userdata() {
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Unsaved changes state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if (!token) {
      setError('No authentication token found');
      setIsLoading(false);
      return;
    }

    try {
      const decoded = parseJWT(token);
      const userSub = decoded.sub;
      setUserId(userSub);

      const storageKey = `userData_${userSub}`;
      const storedData = JSON.parse(localStorage.getItem(storageKey));

      const initialData = storedData || {
        id: userSub,
        name: decoded.name || '',
        email: decoded.email || '',
        phone: '',
        photo: decoded.picture || ''
      };

      if (!storedData) {
        localStorage.setItem(storageKey, JSON.stringify(initialData));
      }

      setUserData(initialData);
      setEditedData(initialData);
    } catch (err) {
      setError('Failed to load user data');
      console.error(err);
    }
    setIsLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    const storageKey = `userData_${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(editedData));
    setUserData(editedData);
    setHasUnsavedChanges(false);
  };

  // Browser tab close/refresh protection
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User ID"
              value={editedData.id || ''}
              InputProps={{ readOnly: true }}
              variant="filled"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={editedData.name || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={editedData.email || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={editedData.phone || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
            >
              Save Changes
            </Button>
            {hasUnsavedChanges && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                You have unsaved changes! Please save before leaving.
              </Alert>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Userdata;