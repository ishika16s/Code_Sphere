const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  files: [{
    filename: String,
    content: String,
    language: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Repository", repositorySchema);
