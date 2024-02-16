const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            trim: true
        },
        dateOfMeal:{
            type: Date,
            required: true,
        },
        mealType:{
            type: String,
            required:true
        },
        mealPrice:{
            type: Number,
            required:true
        },
        additionalItems:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "extraItems"
        }
    }
);

module.exports = mongoose.model("Meals",mealSchema);