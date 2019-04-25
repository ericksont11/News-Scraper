const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UndefeatedSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  link: {
    type: String,
    required: true
  },
  teaser: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const Undefeated = mongoose.model("Undefeated", UndefeatedSchema);

module.exports = Undefeated;