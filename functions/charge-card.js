const fs = require('fs');
const matter = require('gray-matter');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getProducts = () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  const products = filenames.map((filename) => {
    //read the file from the fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    //pull out frontmatter
    const { data } = matter(fileContent);
    return data;
  });
  return products;
};

exports.handler = async (event, context) => {
  const { cart } = JSON.parse(event.body);

  const products = getProducts();

  // construct new cart with id, qty from client and confirmed with data from server
  const cartWithProducts = cart.map(({ id, qty }) => {
    const product = products.find((p) => p.id === id);
    return {
      ...product,
      qty,
    };
  });
  //create array of line items in the correct format
  const lineItems = cartWithProducts.map((product) => ({
    price_data: {
      currency: 'hkd',
      product_data: {
        name: product.name,
      },
      unit_amount: product.price,
    },
    quantity: product.qty,
  }));
  //charging the card
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.URL}/success`,
    cancel_url: `${process.env.URL}/canceled`,
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
