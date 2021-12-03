import React from 'react';
import NextLink from 'next/link';
import { Typography, Link } from '@mui/material';

export default function Brand() {
  return (
    <NextLink href="/" passHref>
      <Link>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          GoShopping
        </Typography>
      </Link>
    </NextLink>
  );
}
