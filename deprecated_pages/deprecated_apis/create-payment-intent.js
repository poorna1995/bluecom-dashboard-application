const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 140000;
};

export default async function handler(req, res) {
  const { item, customer, amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    // calculateOrderAmount(items),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
    customer: customer,
    setup_future_usage: "off_session",

    // items: [
    // 	{
    // 		price: item.price_id,
    // 	},
    // ],
    // line_items: [
    // 	{
    // 		// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    // 		price: item.price_id,
    // 		quantity: 1,
    // 	},
    // ],
  });

  console.log("paymentIntent", paymentIntent);

  try {
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
