const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    let msg;
    if (error.code == 11000) {
      msg = "User already exist";
    } else {
      msg = error.message;
    }
    res.status(400).json(msg);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid User or Password");
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new Error("Invalid User or Password");
    const token = jwt.sign({ id: user._id }, "secret");
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
// good idea to avoid repetition

// const getDataFromReq = (req) => {
//   return new Promise((resolve, reject) => {
//     const { token } = req.params;
//     jwt.verify(token, "secret", {}, (err, user) => {
//       if (err) throw err;
//       resolve(user);
//     });
//   });
// };
router.get("/profile/:token", async (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, "secret", {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.status(201).json({ name, email, _id });
    });
  } else {
    res.send();
  }
});
module.exports = router;
