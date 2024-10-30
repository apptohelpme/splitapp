import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../util/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);

      // Successful sign-in
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Split App
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Please log in with your Google account to continue.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleSignIn}
          sx={{ textTransform: 'none' }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
