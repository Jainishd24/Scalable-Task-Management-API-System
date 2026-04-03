const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    maxUsers: {
      type: Number,
      required: true
    },
    maxProjects: {
      type: Number,
      required: true
    },
    duration: {
      type: Number, // in days
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);