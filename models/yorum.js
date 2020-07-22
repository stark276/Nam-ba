const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const YorumSchema = new Schema({
  content: { type: String}
});

module.exports = mongoose.model("Yorum", YorumSchema);