const mongoose = require("mongoose");

const pantrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    user: { type: mongoose.Types.ObjectId },
    basket: [{ type: mongoose.Types.ObjectId }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pantry", pantrySchema);
