const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["Not started", "In progress", "Finished"],
    default: "Not started"
  }
});

module.exports = mongoose.model("Todo", todoSchema);
