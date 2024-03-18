const mongoose = require('mongoose');

const dailyMeals = new mongoose.Schema({
    messname:{
        type: String,
        required:true
    },
    dateOfMeal: {
        type: Date,
        required: true,
      },
      mealType: {
        type: String,
        required: true,
      },
      mealquantity: {
        type: Number,
        required: true,
        default: 0,
      }
});

module.exports = mongoose.model('DailyMeals',dailyMeals);