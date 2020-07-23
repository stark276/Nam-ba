const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../util/autopopulate");

const YorumSchema = new Schema({
  content: { type: String },
  author : { type: Schema.Types.ObjectId, ref: "User" },
  yorums: [{type: Schema.Types.ObjectId, ref: "Yorum"}] 
});
// Always populate the author field
YorumSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))
    .pre('findOne', Populate('yorums'))
    .pre('find', Populate('yorums'))

module.exports = mongoose.model("Yorum", YorumSchema);