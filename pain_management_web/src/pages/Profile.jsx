import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { profileUpdateSchema } from '../validation/auth';
import { useAuth } from '../contexts/AuthContext';
import client from '../api/client';

const Profile = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, checkAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(profileUpdateSchema),
    defaultValues: {
      email: user?.email || '',
      full_name: user?.full_name || '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      setSuccess('');
      // Only include password if it was provided
      const updateData = {
        email: data.email,
        full_name: data.full_name,
        ...(data.password && { password: data.password }),
      };
      await client.put('/auth/me', updateData);
      await checkAuth(); // Refresh user data
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
            {success}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            id="fullName"
            label="Full Name"
            autoComplete="name"
            {...register('full_name')}
            error={!!errors.full_name}
            helperText={errors.full_name?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="New Password (optional)"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
