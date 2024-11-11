import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/signIn');
  };

  return logout;
};

export default useLogout;
