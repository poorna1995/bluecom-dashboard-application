const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // const { item, customer, amount } = req.body;

  // const subscription = await stripe.subscriptions.create({
  //   customer: customer,
  //   items: [{ price: item.price_id }],
  // });

  // try {
  //   res.send({
  //     subscription,
  //     status: "success",
  //   });
  // } catch (error) {
  //   res.status(500).json({ statusCode: 500, message: error.message });
  // }
  // const customerId = req.cookies['customer'];
  // const priceId = req.body.priceId;
  const { price_id, customer, amount } = req.body;

  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: customer,
      items: [
        {
          price: price_id,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
      // trial_period_days: 30,
      // trial_settings: {
      // 	end_behavior: {
      // 		missing_payment_method: "cancel",
      // 	},
      // },
    });

    res.send({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
}
