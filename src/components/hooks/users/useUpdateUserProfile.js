import { useState } from 'react';
import axios from 'axios';
import { USERS_URL } from '../config';

const useUpdateUserProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUserProfile = async (id, updatedUserData) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('User is not authenticated');
            setLoading(false);
            return;
        }
        try {
            const response = await axios.put(
                `${USERS_URL}/${id}`,
                updatedUserData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    return { updateUserProfile, loading, error };
};

export default useUpdateUserProfile;
