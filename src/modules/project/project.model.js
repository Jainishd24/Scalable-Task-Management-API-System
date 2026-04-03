const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },

  company_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Company", 
    required: true,
    index: true // 🔥 faster queries
  },

  created_by: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  users: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],

  isActive: { 
    type: Boolean, 
    default: true 
  }

}, { timestamps: true });


// 🔥 Prevent duplicate project names per company
projectSchema.index({ name: 1, company_id: 1 }, { unique: true });

module.exports = mongoose.model("Project", projectSchema);