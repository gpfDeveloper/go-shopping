import { useContext } from 'react';
import NextLink from 'next/link';
import { Link, Typography, Badge } from '@mui/material';
import { Store } from 'store/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Cart() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <NextLink href="/cart" passHref>
      <Link>
        <Typography component="span">
          {cart.cartItems.length > 0 ? (
            <Badge color="primary" badgeContent={cart.cartItems.length}>
              <ShoppingCartIcon />
            </Badge>
          ) : (
            <ShoppingCartIcon />
          )}
        </Typography>
      </Link>
    </NextLink>
  );
}
