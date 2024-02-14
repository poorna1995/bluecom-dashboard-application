const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { item, customer, amount } = req.body;

  // list the payment methods attached to a customer
  const paymentMethods = await stripe.customers.listPaymentMethods(customer, {
    type: "card",
  });
  const paymentMethodID = paymentMethods.data[0].id;
  // update the payments method attached to a customer and make it as default
  const customerUpdate = await stripe.customers.update(
    customer,

    {
      invoice_settings: {
        default_payment_method: paymentMethodID,
      },
    }
  );

  try {
    res.send({
      customerUpdate,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
