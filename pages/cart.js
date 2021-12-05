import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Layout from 'components/layouts/Layout';
import { Store } from 'store/Store';
import NextLink from 'next/link';
import {
  Grid,
  Typography,
  Link,
  Button,
  Card,
  List,
  ListItem,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import OrderItemTable from 'components/orders/OrderItemTable';

function CartScreen() {
  const router = useRouter();
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const checkoutHandler = () => {
    router.push('/shipping');
  };
  return (
    <Layout title="Shopping Cart">
      <Box sx={{ margin: '1rem 0' }}>
        <NextLink href="/" passHref>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back to shopping
          </Button>
        </NextLink>
      </Box>
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Box>
          Cart is empty.{' '}
          <NextLink href="/" passHref>
            <Link>Go shopping</Link>
          </NextLink>
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <OrderItemTable orderedItems={cartItems} hasAction={true} />
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={checkoutHandler}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
