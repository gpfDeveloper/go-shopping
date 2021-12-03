import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import NextLink from 'next/link';
import { Link } from '@mui/material';

export default function FeaturedProducts({ featuredProducts }) {
  return (
    <Carousel>
      {featuredProducts.map((product) => (
        <NextLink key={product._id} href={`/product/${product.slug}`} passHref>
          <Link display="block">
            <img src={product.featuredImage} alt={product.name}></img>
          </Link>
        </NextLink>
      ))}
    </Carousel>
  );
}
