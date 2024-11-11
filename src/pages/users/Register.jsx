import React, { useState } from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/hooks/useAuth';
import './Users.css'

function Register () {
    const { registerUser, loading } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser(formData);
    };

    return (
        <>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="Firstname"
                name="firstName"
                autoComplete="firstname"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Lastname"
                name="lastName"
                autoComplete="lastname"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                id="email"
                autoComplete="email"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                disabled={loading}
              >
                Register
              </Button>
            </form>
            <p className='p-register'>
              Already have an account?{' '}
              <Link to="/signIn" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </p>
          </Paper>
        </Container>
      </Box>
        </>
    );
};

export default Register;
