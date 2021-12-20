import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: 4,
        padding: 2,
        textAlign: 'center',
        backgroundColor: '#342c44',
        color: '#fff',
      }}
    >
      <Typography>Developed by Pengfei Gao</Typography>
    </Box>
  );
}
