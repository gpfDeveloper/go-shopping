import { Typography } from '@mui/material';
import Layout from 'components/layouts/Layout';
import db from 'utils/db';
import Product from 'models/Product';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FeaturedProducts from 'components/products/FeaturedProducts';
import Products from 'components/products/Products';

export default function Home(props) {
  const { topRatedProducts, featuredProducts } = props;

  return (
    <Layout>
      <FeaturedProducts featuredProducts={featuredProducts} />
      <Typography variant="h2">Popular Products</Typography>
      <Products products={topRatedProducts} />
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
