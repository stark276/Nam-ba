const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const YorumSchema = new Schema({
  content: { type: String },
  author : { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Yorum", YorumSchema);