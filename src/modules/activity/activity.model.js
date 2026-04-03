const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fromStatus: String,
    toStatus: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);