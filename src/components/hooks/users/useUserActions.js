import { useState, useEffect } from 'react';
import axios from 'axios';
import { USERS_URL } from '../config';

const useUserActions = (pageNumber = 1, pageSize = 2) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const getAllUsersData = async () => {
            setLoading(true);
            setError('');

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                setError("No token found. Please login.");
                return;
            }

            try {
                const response = await axios.get(`${USERS_URL}`, {
                    params: {
                        pageNumber,
                        pageSize,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data.users);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getAllUsersData();
    }, [pageNumber, pageSize]);

    const deleteUser = async (userId) => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            setError("No token found. Please login.");
            return;
        }

        try {
            const response = await axios.delete(`${USERS_URL}/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserData((prevData) => prevData.filter((user) => user.id !== userId));
            return response.data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { userData, totalPages, deleteUser, loading, error };

};
export default useUserActions;
