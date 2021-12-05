import React from 'react';
import { Grid, Typography, Card, List, ListItem } from '@mui/material';

export default function OrderSummary({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  children,
}) {
  return (
    <Card>
      <List>
        <ListItem>
          <Typography variant="h2">Order Summary</Typography>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Items:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">${itemsPrice}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Tax:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">${taxPrice}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Shipping:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">${shippingPrice}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={6}>
              <Typography>
                <strong>Total:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>${totalPrice}</strong>
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        {children}
      </List>
    </Card>
  );
}
