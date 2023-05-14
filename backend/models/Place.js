const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true],
  },
  address: { type: String },
  photos: [{ type: String }],
  desc: { type: String },
  perks: [{ type: String }],
  extraInfo: { type: String },
  checkIn: { type: Number },
  checkOut: { type: Number },
  maxQuests: { type: Number },
  price: { type: Number },
});

const Place = mongoose.model("Place", PlaceSchema);

module.exports = Place;
