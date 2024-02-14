const stripe = require("stripe")("");

const customer = await stripe.customers.create();
