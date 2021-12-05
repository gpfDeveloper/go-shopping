import React from 'react';
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import NextLink from 'next/link';

export default function UserTable({ users, onDelete }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>ADMIN</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id.substring(20, 24)}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.isAdmin ? 'YES' : 'NO'}</TableCell>
              <TableCell>
                <NextLink href={`/admin/user/${user._id}`} passHref>
                  <Button size="small" variant="contained">
                    Edit
                  </Button>
                </NextLink>{' '}
                <Button
                  onClick={() => onDelete(user._id)}
                  size="small"
                  variant="outlined"
                  color="error"
                  sx={{ marginLeft: 1 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
