const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfMeal: {
    type: String,
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  mealPrice: {
    type: Number,
    required: true,
    default: 50,
  },
  additionalItems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "extraItems",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

module.exports = mongoose.model("Meals", mealSchema);
