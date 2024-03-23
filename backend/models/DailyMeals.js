const mongoose = require('mongoose');

const dailyMeals = new mongoose.Schema({
    messname:{
        type: String,
    },
    dateOfMeal: {
        type: String,
      },
      mealType: {
        type: String,
      },
      mealquantity: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5 *60,
      }
});

module.exports = mongoose.model('DailyMeals',dailyMeals);