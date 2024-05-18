const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    date : {
        type : Date,
        required : true
    },
    time : {
        type : String,
        requited : true
    },
    nom : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;