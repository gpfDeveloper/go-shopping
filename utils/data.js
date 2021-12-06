import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Pengfei',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Super Crema',
      category: 'Coffee',
      image: '/images/01_superCrema_coffee_lavazza.jpg',
      isFeatured: true,
      featuredImage: '/images/01_banner1.jpg',
      price: 118,
      brand: 'Lavazza',
      rating: 5,
      numReviews: 0,
      countInStock: 20,
      description:
        'Lavazza Super Crema Whole Bean Coffee Blend, Medium Espresso Roast, 2.2 Pound (Pack of 6), Authentic Italian, Blended and roasted in Italy, Value Pack, Mild and creamy',
    },
    {
      name: 'Qualita Rossa',
      category: 'Coffee',
      image: '/images/02_qualitaRossa_coffee_lavazza.jpg',
      isFeatured: true,
      featuredImage: '/images/02_banner2.jpg',
      price: 19.99,
      brand: 'Lavazza',
      rating: 5,
      numReviews: 0,
      countInStock: 10,
      description:
        'Lavazza Qualita Rossa, Italian Coffee Beans Expresso, 2.2lb ,Authentic Italian, Blended and roasted in Italy, gluten_free, Chocolaty flavor, Full body, intense aromas',
    },
    {
      name: 'Perfetto Ground',
      category: 'Coffee',
      image: '/images/03_perfettoGround_coffee_lavazza.jpg',
      price: 10.8,
      brand: 'Lavazza',
      rating: 4.5,
      numReviews: 0,
      countInStock: 21,
      description:
        'Lavazza Perfetto Ground Coffee Blend, Dark Roast, 20 Ounce Authentic Italian, Gluten Free, Blended And Roated in Italy, Value Pack, Caramel flavor with Dark and Velvety Texture',
    },
    {
      name: 'Blu Espresso Ground',
      category: 'Coffee',
      image: '/images/04_bluEspressoGround_coffee_lavazza.jpg',
      price: 33.79,
      brand: 'Lavazza',
      rating: 4.5,
      numReviews: 0,
      countInStock: 22,
      description:
        'Lavazza in Blu Espresso Ground Coffee Blend, Medium Espresso Roast, 8.8-Ounce Cans (Pack of 4)',
    },
    {
      name: 'Fog Chaser',
      category: 'Coffee',
      image: '/images/05_fogChaser_coffee_SanFranciscoBay.jpg',
      price: 18.99,
      brand: 'SAN FRANCISCO BAY',
      rating: 4,
      numReviews: 0,
      countInStock: 10,
      description:
        'SF Bay Coffee Fog Chaser Whole Bean 2LB (32 Ounce) Medium Dark Roast',
    },
    {
      name: 'Espresso Roast',
      category: 'Coffee',
      image: '/images/06_espressoRoast_coffee_Starbucks.jpg',
      price: 9.98,
      brand: 'Starbucks',
      isFeatured: true,
      featuredImage: '/images/06_banner3.jpg',
      rating: 5,
      numReviews: 0,
      countInStock: 0,
      description:
        'Starbucks Dark Roast Whole Bean Coffee — Espresso Roast — 100% Arabica — 1 bag (18 oz.)',
    },
    {
      name: 'Lindt Excellence Bar',
      category: 'Chocolate',
      image: '/images/07_exceBar_Chocolate_Lindt.jpg',
      price: 33.36,
      brand: 'Lindt',
      rating: 5,
      numReviews: 0,
      countInStock: 20,
      description:
        'Lindt Excellence Bar, 90% Cocoa Supreme Dark Chocolate, Gluten Free, Great for Holiday Gifting, 3.5 Ounce (Pack of 12)',
    },
    {
      name: 'Organic Dark Chocolate Bar',
      category: 'Chocolate',
      image: '/images/08_organicDark_Chocolate_GreenBlack.jpg',
      price: 28.86,
      brand: 'Green & Black',
      rating: 4,
      numReviews: 0,
      countInStock: 3,
      description:
        'Green & Black Organic Dark Chocolate Bar, 85% Cacao, Christmas Chocolate Gift Stocking Stuffers, - 3.17 oz Bars (Pack of 10)',
    },
  ],
};
export default data;
