import React from 'react';
import {
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import NextLink from 'next/link';

export default function Sidebar({ isVisiable, onClose, categories }) {
  return (
    <Drawer anchor="left" open={isVisiable} onClose={onClose}>
      <List>
        <ListItem>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Shopping by category</Typography>
            <IconButton aria-label="close" onClick={onClose}>
              <CancelIcon />
            </IconButton>
          </Box>
        </ListItem>
        <Divider light />
        {categories.map((category) => (
          <NextLink
            key={category}
            href={`/search?category=${category}`}
            passHref
          >
            <ListItem button component="a" onClick={onClose}>
              <ListItemText primary={category}></ListItemText>
            </ListItem>
          </NextLink>
        ))}
      </List>
    </Drawer>
  );
}
