import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import { loginSuccess } from '../../store/authSlice';
import { v4 as uuidv4 } from 'uuid';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Mock validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock authentication
    if (formData.email === 'user@example.com' && formData.password === 'password') {
      dispatch(
        loginSuccess({
          id: uuidv4(),
          email: formData.email,
          name: 'Test User',
        })
      );
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid credentials');
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google authentication
    dispatch(
      loginSuccess({
        id: uuidv4(),
        email: 'google.user@example.com',
        name: 'Google User',
        picture: 'https://via.placeholder.com/150',
      })
    );
    navigate('/dashboard', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          sx={{ mb: 2 }}
        >
          Sign in with Google
        </Button>

        <Typography align="center">
          Don't have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;