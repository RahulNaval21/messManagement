const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    messname:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    token: {
        type: String,
      },
    resetPasswordExpires: {
        type: Date,
      }
});


module.exports = mongoose.nodel('admin',adminSchema);