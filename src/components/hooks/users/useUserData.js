import { useState, useEffect } from 'react';
import axios from 'axios';
import { USERS_URL } from '../config';

const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = () => {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }
            axios
                .get(`${USERS_URL}/auth`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setUserData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    setError(err);
                    console.error("Error fetching user data:", err);
                });
        };

        getUserData();
    }, []);

    return { userData, loading, error };
};

export default useUserData;
