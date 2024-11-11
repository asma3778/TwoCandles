import React, { useState, useEffect } from 'react';
import { CircularProgress, Card, CardContent, Typography, Box, Button, TextField } from '@mui/material';
import useUserData from '../../hooks/users/useUserData';
import useUpdateUserProfile from '../../hooks/users/useUpdateUserProfile';

function UserProfile() {
  const { userData, loading } = useUserData();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(userData || {});

  const { updateUserProfile, loading: updating, error } = useUpdateUserProfile();

  useEffect(() => {
    if (userData) {
      setUpdatedUserData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const userId = userData?.userId;

    if (!userId) {
      alert("User ID is not available. Please log in again.");
      return;
    }

    const result = await updateUserProfile(userId, {
      firstName: updatedUserData.firstName,
      lastName: updatedUserData.lastName,
      email: updatedUserData.email,
      address: updatedUserData.address,
    });

    if (result) {
      setIsEditing(false);
      alert('Profile updated successfully');
    }
  };

  const handleCancel = () => {
    setUpdatedUserData(userData);
    setIsEditing(false);
  };

  if (loading) return <CircularProgress size="200px" />;

  if (!userData) {
    return <Typography className="user-profile-error">User profile not found</Typography>;
  }

  return (
    <Box className="user-profile-wrapper">
      <Card className="user-profile-card">
        <CardContent className="user-profile-content">
          {isEditing ? (
            <>
              <TextField
                label="First Name"
                name="firstName"
                value={updatedUserData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={updatedUserData.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={updatedUserData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={updatedUserData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Box mt={2}>
                <Button className="products-button" onClick={handleSave} disabled={updating}>
                  {updating ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outlined" onClick={handleCancel} sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </Box>
              {error && <Typography color="error">{error}</Typography>}
            </>
          ) : (
            <>
              <Typography className="user-profile-name">
                {updatedUserData.firstName} {updatedUserData.lastName}
              </Typography>
              <Typography className="user-profile-info">
                <span className="user-profile-info-label">Email:</span> {updatedUserData.email}
              </Typography>
              <Typography className="user-profile-info">
                <span className="user-profile-info-label">Address:</span> {updatedUserData.address || 'Not provided'}
              </Typography>
              <Button className="products-button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserProfile;