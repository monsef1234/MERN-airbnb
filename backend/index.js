const express = require("express");
const cors = require("cors");
require("dotenv").config();
const UserRoutes = require("./routes/UserRoutes");
const PlaceRoutes = require("./routes/PlaceRoutes");
const BookingRoutes = require("./routes/BookingRoutes");
const app = express();
app.use(cors());
require("./connection");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", UserRoutes);
app.use("/place", PlaceRoutes);
app.use("/booking", BookingRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server Connected");
});
