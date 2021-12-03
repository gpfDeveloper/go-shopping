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
      <Typography>
        Copyright &copy; {new Date().getFullYear()} Pengfei Gao
      </Typography>
    </Box>
  );
}
