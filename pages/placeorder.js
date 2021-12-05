import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from 'components/layouts/Layout';
import { Store } from 'store/Store';
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Card,
  List,
  ListItem,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import CheckoutWizard from 'components/UIs/CheckoutWizard';
import { useSnackbar } from 'notistack';
import { getError } from 'utils/error';
import Cookies from 'js-cookie';
import OrderSummary from 'components/orders/OrderSummary';
import OrderItemTable from 'components/orders/OrderItemTable';

function PlaceOrder() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress },
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!shippingAddress) {
      router.push('/shipping');
    }
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, []);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      setLoading(false);
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid
          item
          md={9}
          xs={12}
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <Card>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </ListItem>
            </List>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <OrderItemTable orderedItems={cartItems} hasAction={false} />
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <OrderSummary
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
          >
            <ListItem>
              <Button
                onClick={placeOrderHandler}
                variant="contained"
                color="primary"
                fullWidth
              >
                Place Order
              </Button>
            </ListItem>
            {loading && (
              <ListItem>
                <CircularProgress />
              </ListItem>
            )}
          </OrderSummary>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
