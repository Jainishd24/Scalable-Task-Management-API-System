const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },

  // 🔹 Company status lifecycle
  status: {
    type: String,
    enum: ["pending", "active", "payment_failed"],
    default: "pending",
  },

  // 🔹 Plan (AFTER PAYMENT)
  subscriptionPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },

  planExpiry: { type: Date },

  // 🔹 Payment details
  payment_link_id: { type: String },

  payment_status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  // 🔹 Optional: track limits usage (for performance)
  projectCount: { type: Number, default: 0 },
  userCount: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);