const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   nom:{
    type: String,
required:true,
   }, 
    email: {
        type: String,
        lowercase: true,
        required: [true, "userName can't be empty"],
        // @ts-ignore
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "userName format is not correct",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    confirm_password: {
        type: String,
        required: [true, "password is required"],
    },
});

const User = mongoose.model('User' , userSchema);

module.exports= User

//mongodb+srv://nada:<password>@cluster0.8ils5xa.mongodb.net/