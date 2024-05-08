const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom:{
        type: String,
        required:true,
    }, 
    email: {
        type: String,
        required: [true, "userName can't be empty"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "userName format is not correct",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    }
});

const User = mongoose.model('User' , userSchema);

module.exports= User