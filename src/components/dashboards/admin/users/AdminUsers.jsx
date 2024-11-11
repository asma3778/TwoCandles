import React, { useState } from 'react'
import { Box, CircularProgress, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from '../admin dashboard/AdminSidebar'
import useUserActions from '../../../hooks/users/useUserActions';

export default function AdminUsers() {

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const { userData, totalPages, deleteUser, loading, error } = useUserActions(pageNumber, pageSize);

  if (loading) return <CircularProgress size="200px" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-dashboard-container">
      <h1 className='admin-dashboard'>AdminUsers</h1>
      <AdminSidebar />
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <Table className="product-table">
          <TableHead>
            <TableRow>
              <TableCell>User First Name</TableCell>
              <TableCell>User Last Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>User Adress</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>
                  {user.firstName}
                </TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.address}
                </TableCell>
                <TableCell>
                  <DeleteIcon onClick={() => deleteUser(user.userId)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Pagination
        count={totalPages}
        page={pageNumber}
        onChange={(event, value) => setPageNumber(value)}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
}
