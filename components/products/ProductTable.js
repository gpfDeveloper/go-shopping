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

export default function ProductTable({ products, onDelete }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell>CATEGORY</TableCell>
            <TableCell>COUNT</TableCell>
            <TableCell>RATING</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product._id.substring(20, 24)}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.countInStock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell>
                <NextLink href={`/admin/product/${product._id}`} passHref>
                  <Button size="small" variant="contained">
                    Edit
                  </Button>
                </NextLink>{' '}
                <Button
                  onClick={() => onDelete(product._id)}
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
