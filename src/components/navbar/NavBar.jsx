import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person4Icon from '@mui/icons-material/Person4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DashboardIcon from '@mui/icons-material/Dashboard';
import useLogout from '../hooks/useLogout';
import './NavBar.css'
import useUserData from '../hooks/users/useUserData';

const NavBar = ({ }) => {
    const logout = useLogout();
    const { userData } = useUserData();

    const isAuthenticated = Boolean(localStorage.getItem("token"));

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                {!isAuthenticated ? (
                    <li>
                        <Link to="/register">
                        <HowToRegIcon />
                        </Link>
                    </li>
                ) : (

                    <>
                        {userData?.role === 'Customer' && (
                            <>
                                <li>
                                    <Link to="/wishlist">
                                        <ShoppingCartIcon />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/users/profile">
                                    <Person4Icon />
                                    </Link>
                                </li>
                            </>
                        )}

                        {userData?.role === 'Admin' && (
                            <>
                                <li>
                                    <Link to="/admin">
                                    <DashboardIcon />
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link onClick={logout}>
                            <ExitToAppIcon />
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
