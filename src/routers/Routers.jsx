import React from 'react'
import { Route, Routes } from 'react-router-dom';
import useUserData from '../components/hooks/users/useUserData';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import Products from '../pages/products/ProductsPage';
import ProductDetail from '../pages/products/ProductDetails';
import Register from '../pages/users/Register';
import SignIn from '../pages/users/SignIn';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '../components/dashboards/admin/admin dashboard/AdminDashboard';
import AdminOrders from '../components/dashboards/admin/orders/AdminOrders';
import AdminProduct from '../components/dashboards/admin/products/AdminProduct';
import AdminUsers from '../components/dashboards/admin/users/AdminUsers';
import UserProfile from '../components/dashboards/user dashboard/UserProfile';
import Wishlist from '../pages/Wishlist';

export default function Routers() {
    const { userData, loading } = useUserData();
    const isAuthenticated = Boolean(userData);

    const truncateDescription = (description, length = 100) => {
        return description.length > length ? description.substring(0, length) + '...' : description;
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/products" element={<Products truncateDescription={truncateDescription} />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signIn" element={<SignIn />} />

            <Route
                path="/admin"
                element={<ProtectedRoute shouldCheckAdmin={true} isAuthenticated={isAuthenticated} userRole={userData?.role} requiredRole="Admin" element={<AdminDashboard />} />}
            />
            <Route
                path="/admin/orders"
                element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userData?.role} requiredRole="Admin" element={<AdminOrders />} />}
            />
            <Route
                path="/admin/products"
                element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userData?.role} requiredRole="Admin" element={<AdminProduct />} />}
            />
            <Route
                path="/admin/users"
                element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userData?.role} requiredRole="Admin" element={<AdminUsers />} />}
            />
            <Route
                path="/users/profile"
                element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userData?.role} requiredRole="Customer" element={<UserProfile />} />}
            />
            <Route
                path="/wishlist"
                element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userData?.role} element={<Wishlist truncateDescription={truncateDescription} />} />}
            />
        </Routes>
    )
}