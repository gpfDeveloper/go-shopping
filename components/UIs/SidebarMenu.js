import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function SidebarMenu({ onClick }) {
  return (
    <IconButton
      edge="start"
      aria-label="open drawer"
      onClick={onClick}
      sx={{ padding: 0 }}
    >
      <MenuIcon
        sx={{
          color: '#ffffff',
          textTransform: 'initial',
        }}
      />
    </IconButton>
  );
}
