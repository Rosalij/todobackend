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
    enum: ["ej påbörjad", "pågående", "avklarad"],
    default: "ej påbörjad"
  }
});

module.exports = mongoose.model("Todo", todoSchema);
