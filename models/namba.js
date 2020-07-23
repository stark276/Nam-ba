const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NambaSchema = new Schema({
  title: { type: String},
  url: { type: String },
  content: { type: String },
  subnamba: { type: String },
  yorums: [{ type: Schema.Types.ObjectId, ref: 'Yorum' }],
  author : { type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("Namba", NambaSchema);