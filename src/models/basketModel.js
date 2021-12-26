const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    key: { type: String, default: "value" },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("Basket", basketSchema);
