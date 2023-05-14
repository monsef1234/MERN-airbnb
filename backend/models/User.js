const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Can't be blank"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
    required: [true, "Can't be blank"],
    validate: [isEmail, "Invalid Email"],
  },
  password: {
    type: String,
    required: [true, "Can't be blank"],
  },
});
UserSchema.pre("save", function (next) {
  if (this.password) {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(this.password, salt);
    this.password = password;
  }
  next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
