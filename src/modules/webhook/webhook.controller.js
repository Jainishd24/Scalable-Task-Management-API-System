const stripe = require("../../config/stripe");
const Company = require("../company/company.model");
const User = require("../user/user.model");

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {

    const session = event.data.object;

    const company_id = session.metadata.company_id;
    const plan_id = session.metadata.plan_id;

    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);

    await Company.findByIdAndUpdate(company_id, {
      status: "active",
      payment_status: "paid",
      subscriptionPlan: plan_id,
      planExpiry: expiry,
    });

    await User.updateMany(
      { company_id },
      { status: "active" }
    );
  }

  res.json({ received: true });
};