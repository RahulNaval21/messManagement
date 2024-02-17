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
        }
    }
);
module.exports = mongoose.model("ExtraItems",extraItemsSchema);