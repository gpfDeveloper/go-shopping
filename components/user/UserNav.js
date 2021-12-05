import React from 'react';
import { Card, ListItem, ListItemText, List } from '@mui/material';
import NextLink from 'next/link';

export default function UserNav({ path }) {
  return (
    <Card>
      <List>
        <NextLink href="/profile" passHref>
          <ListItem selected={path === 'profile'} button component="a">
            <ListItemText primary="User Profile"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/order-history" passHref>
          <ListItem selected={path === 'order-history'} button component="a">
            <ListItemText primary="Order History"></ListItemText>
          </ListItem>
        </NextLink>
      </List>
    </Card>
  );
}
