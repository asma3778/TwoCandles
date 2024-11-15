import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USERS_URL } from './config';
import { useState } from 'react';
import useUserData from './users/useUserData';

export const useAuth = () => {

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const { userData, loading, error } = useUserData();

  const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${USERS_URL}`, formData);
        setUserDetails(response.data);
    } catch (err) {
        console.log(err.message);
    } 
};

  function signInUser(credentials) {
    const userUrlLogIn = `${USERS_URL}/signIn`;
    axios
      .post(userUrlLogIn, credentials)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
        }
      })
      .then(() => {
        setUserDetails(userData); 
        navigate('/');})
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          alert(error.response.data.message);
        }
      });
  }
  return { signInUser, registerUser };
};
