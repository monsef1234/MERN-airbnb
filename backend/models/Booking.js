const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  place: { type: mongoose.Types.ObjectId, required: true, ref: "Place" },
  owner: { type: mongoose.Types.ObjectId, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: String, required: true },
  price: Number,
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
