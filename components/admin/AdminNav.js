import React from 'react';
import { Card, ListItem, ListItemText, List } from '@mui/material';
import NextLink from 'next/link';

export default function AdminNav({ path }) {
  return (
    <Card>
      <List>
        <NextLink href="/admin/dashboard" passHref>
          <ListItem selected={path === 'dashboard'} button component="a">
            <ListItemText primary="Admin Dashboard"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/admin/orders" passHref>
          <ListItem selected={path === 'orders'} button component="a">
            <ListItemText primary="Orders"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/admin/products" passHref>
          <ListItem selected={path === 'products'} button component="a">
            <ListItemText primary="Products"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/admin/users" passHref>
          <ListItem selected={path === 'users'} button component="a">
            <ListItemText primary="Users"></ListItemText>
          </ListItem>
        </NextLink>
      </List>
    </Card>
  );
}
