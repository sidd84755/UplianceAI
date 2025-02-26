import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

const clientId = "1065854883924-coctjvr5r12d8l8lvqgc41dleqbe47dk.apps.googleusercontent.com"; // client ID

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    const handleCredentialResponse = (response) => {
      console.log("Encoded JWT ID token: ", response.credential);
      // Save the token in localStorage
      localStorage.setItem("googleToken", response.credential);
      navigate('/dashboard');
    };

    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>
        <div id="googleSignInDiv" />
      </Box>
    </Container>
  );
}

export default Login;
