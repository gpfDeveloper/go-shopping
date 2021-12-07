import { useContext } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Grid } from '@mui/material';
import { Store } from 'store/Store';
import ProductItem from './ProductItem';

export default function Products({ products }) {
  const { state, dispatch } = useContext(Store);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      closeSnackbar();
      enqueueSnackbar('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <Grid container spacing={3} justifyContent="center">
      {products.map((product) => (
        <Grid item md={4} key={product._id}>
          <ProductItem product={product} addToCartHandler={addToCartHandler} />
        </Grid>
      ))}
    </Grid>
  );
}
