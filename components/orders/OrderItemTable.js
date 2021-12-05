import { useContext } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Link,
  MenuItem,
  Button,
  Select,
} from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Store } from 'store/Store';

export default function OrderItemTable({ orderedItems, hasAction }) {
  const { dispatch } = useContext(Store);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const updateCartHandler = async (item, quantity) => {
    closeSnackbar();
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            {hasAction && <TableCell align="right">Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <NextLink href={`/product/${item.slug}`} passHref>
                  <Link>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    ></Image>
                  </Link>
                </NextLink>
              </TableCell>

              <TableCell>
                <NextLink href={`/product/${item.slug}`} passHref>
                  <Link>
                    <Typography>{item.name}</Typography>
                  </Link>
                </NextLink>
              </TableCell>
              <TableCell align="right">
                {hasAction && (
                  <Select
                    value={item.quantity}
                    onChange={(e) => updateCartHandler(item, e.target.value)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                {!hasAction && <Typography>{item.quantity}</Typography>}
              </TableCell>
              <TableCell align="right">${item.price}</TableCell>
              {hasAction && (
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => removeItemHandler(item)}
                  >
                    x
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
