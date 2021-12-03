import moment from 'moment';
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

export default function OrderTable({ orders, isAdmin }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            {isAdmin && <TableCell>USER</TableCell>}
            <TableCell>DATE</TableCell>
            <TableCell>TOTAL</TableCell>
            <TableCell>PAID AT</TableCell>
            <TableCell>DELIVERED AT</TableCell>
            <TableCell>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id.substring(20, 24)}</TableCell>
              {isAdmin && (
                <TableCell>
                  {order.user ? order.user.name : 'DELETED USER'}
                </TableCell>
              )}
              <TableCell>{moment(order.createdAt).format('LLL')}</TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>
                {order.isPaid ? moment(order.paidAt).format('LLL') : 'Not paid'}
              </TableCell>
              <TableCell>
                {order.isDelivered
                  ? moment(order.deliveredAt).format('LLL')
                  : 'Not delivered'}
              </TableCell>
              <TableCell>
                <NextLink href={`/order/${order._id}`} passHref>
                  <Button variant="contained">Details</Button>
                </NextLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
