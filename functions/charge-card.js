const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const products = require('./products.json');

exports.handler = async (event, context) => {
  const { cart } = JSON.parse(event.body);

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
