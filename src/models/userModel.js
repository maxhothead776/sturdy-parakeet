const mongoose = require("mongoose");

const { validator } = require("../utils");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: validator.validateEmail,
        message: "Please enter a valid email address",
        isAsync: false,
      },
      match: [validator.emailRegex, "Please enter a valid email address"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
