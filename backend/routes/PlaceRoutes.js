const Place = require("../models/Place");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
router.get("/user/:token", (req, res) => {
  const token = req.params.token;

  jwt.verify(token, "secret", {}, async (err, user) => {
    try {
      const { id } = user;
      const places = await Place.find({ owner: id });
      res.status(201).json(places);
    } catch (error) {
      res.status(400).json(err);
    }
  });
});
router.get("/t/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const place = await Place.findById(id);
    res.status(201).json(place);
  } catch (error) {
    res.status(400).status(error.message);
  }
});
router.get("/", async (req, res) => {
  try {
    const places = await Place.find({});
    res.status(201).json(places);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.put("/", (req, res) => {
  const { id, token, place, perks } = req.body;
  try {
    jwt.verify(token, "secret", {}, async (err, user) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (user.id === placeDoc.owner.toString()) {
        placeDoc.set({
          ...place,
          perks,
        });
        placeDoc.save();
        res.status(201).json(placeDoc);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/new", async (req, res) => {
  const { owner, place } = req.body;
  try {
    const newPlace = await Place.create({ owner, ...place });
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
