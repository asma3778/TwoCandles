
import React from 'react';
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import useOrders from '../../../hooks/useOrders';  
import AdminSidebar from '../admin dashboard/AdminSidebar';

const AdminOrders = () => {
  const { orders, loading, error } = useOrders(); 

  if (loading) return <CircularProgress size="200px" />; 
  if (error) return <p>{error}</p>; 

  return (
    <div className="admin-orders-container">
      <h1 className="admin-dashboard">Admin Orders</h1>
      <AdminSidebar />

      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
        <Table className="orders-table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>User ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default AdminOrders;

