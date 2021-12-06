import nc from 'next-connect';
import Product from 'models/Product';
import db from 'utils/db';
import data from 'utils/data';
import User from 'models/User';
import Order from 'models/Order';
import { getSlug } from 'utils';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(
    data.products.map((p) => ({
      ...p,
      slug: getSlug(p.name, p.category, p.brand),
    }))
  );
  await Order.deleteMany();
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
