const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);