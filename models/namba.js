const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NambaSchema = new Schema({
  title: { type: String},
  url: { type: String },
  content: { type: String }
});

module.exports = mongoose.model("Namba", NambaSchema);