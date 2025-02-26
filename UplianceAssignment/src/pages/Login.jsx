import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Avatar, 
  LinearProgress,
  useTheme 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';

const clientId = "1065854883924-coctjvr5r12d8l8lvqgc41dleqbe47dk.apps.googleusercontent.com";

function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const initializeGoogleAuth = () => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          localStorage.setItem("googleToken", response.credential);
          navigate('/dashboard');
        }
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { 
          theme: "filled_blue", 
          size: "large",
          width: 300,
          shape: "pill",
          logo_alignment: "center"
        }
      );
      
      setScriptLoaded(true);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleAuth;
      document.body.appendChild(script);
    } else {
      initializeGoogleAuth();
    }
  }, [navigate]);

  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh' }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left Panel - Illustration */}
        <Grid item xs={12} md={6} sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8
        }}>
          <Box sx={{ 
            textAlign: 'center', 
            color: 'white',
            maxWidth: 600 
          }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Welcome to Upliance
            </Typography>
            <Typography variant="h6">
            Now,
            everyone can cook everything
            </Typography>
            <Box
              component="img"
              src="https://cdn.shopify.com/s/files/1/0764/8290/4373/files/hero_image_4eb030c8-3d3e-4745-abde-05de9c1e52d2.png?v=1720433921" // Replace with your illustration
              alt="Smart Home"
              sx={{ 
                width: '100%', 
                maxWidth: 400, 
                mt: 6,
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))'
              }}
            />
          </Box>
        </Grid>

        {/* Right Panel - Login Form */}
        <Grid item xs={12} md={6} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4
        }}>
          <Paper elevation={6} sx={{ 
            width: '100%',
            maxWidth: 500,
            padding: 4,
            borderRadius: 4,
            position: 'relative'
          }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}>
              <Avatar sx={{ 
                bgcolor: theme.palette.primary.main,
                width: 56,
                height: 56,
                mb: 2
              }}>
                <LockOutlinedIcon fontSize="large" />
              </Avatar>

              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Sign In
              </Typography>
              
              <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ mb: 4 }}>
                Secure access to your Upliance management portal
              </Typography>

              {!scriptLoaded && <LinearProgress sx={{ width: '100%', mb: 2 }} />}
              
              <Box id="googleSignInDiv" sx={{ 
                width: '100%',
                
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                '& div': { 
                  width: '60% !important',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }
              }} />

              <Typography variant="caption" color="textSecondary" sx={{ mt: 4 }}>
                By continuing, you agree to our <br />
                <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                  Terms of Service
                </Box> and <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                  Privacy Policy
                </Box>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ 
        position: 'fixed',
        bottom: 16,
        left: 0,
        right: 0,
        textAlign: 'center'
      }}>
        <Typography variant="caption" color="textSecondary">
          © {new Date().getFullYear()} All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;