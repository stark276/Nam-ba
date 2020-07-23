const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../util/autopopulate");


const NambaSchema = new Schema({
  title: { type: String},
  url: { type: String },
  content: { type: String },
  subnamba: { type: String },
  yorums: [{ type: Schema.Types.ObjectId, ref: 'Yorum' }],
  author : { type: Schema.Types.ObjectId, ref: "User"}
});
// Always populate the author field
NambaSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

module.exports = mongoose.model("Namba", NambaSchema);