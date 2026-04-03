const stripe = require("../../config/stripe");
const Company = require("../company/company.model");

exports.createCheckoutSession = async ({ company_id, plan }) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: plan.name,
          },
          unit_amount: plan.price * 100,
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,

    metadata: {
      company_id: company_id,
      plan_id: plan._id.toString(),
    },
  });

  await Company.findByIdAndUpdate(company_id, {
    payment_status: "pending",
  });

  return session.url;
};