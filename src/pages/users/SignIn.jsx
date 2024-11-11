import React, { useState } from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '../../components/hooks/useAuth';
import './Users.css'

function SignIn() {
  const { signInUser } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInUser(credentials);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
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
              login
            </Typography>
            <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
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
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default SignIn;
