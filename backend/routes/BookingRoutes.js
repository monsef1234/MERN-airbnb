const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get("/all/:token", async (req, res) => {
  const { token } = req.params;
  if (token) {
    jwt.verify(token, "secret", {}, async (err, user) => {
      if (err) throw err;
      try {
        const bookings = await Booking.find({ owner: user.id }).populate(
          "place"
        );
        res.status(201).json(bookings);
      } catch (error) {
        res.status(400).json(error.message);
      }
    });
  } else {
    res.send();
  }
});
router.post("/new", async (req, res) => {
  const { name, phone, guests, checkIn, checkOut, owner, place, price } =
    req.body;
  try {
    const booking = await Booking.create({
      name,
      phone,
      guests,
      checkIn,
      checkOut,
      place,
      price,
      owner,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
