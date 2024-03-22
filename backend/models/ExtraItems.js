const mongoose = require("mongoose");

const extraItemsSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim: true
        },
        quantity:{
            type:Number,
            required:true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 60 * 5 * 60,
          }
    }
);
module.exports = mongoose.model("ExtraItems",extraItemsSchema);