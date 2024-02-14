const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { customer } = req.body;
  try {
    const intent = await stripe.setupIntents.create({
      customer: customer,
      automatic_payment_methods: { enabled: true },
    });
    res.json({ client_secret: intent.client_secret });
  } catch (error) {
    res.status(error.statusCode || 500).json(error);
  }
}
