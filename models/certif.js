const mongoose = require('mongoose');

const certifSchema = new mongoose.Schema({
    certificat: {
        type: String,
        required: true,
    },
    userId : {
        type: mongoose.Types.ObjectId,
        // required: true,
    },
    status : {
        type : String,
        default : 'en attente'
    },
    nom: {
        type: String,
        required: true,
    }, 
    prenom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: false,
        match: [
            /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
            "Format d'email incorrect"
        ],
        unique: true,
    },
    cin: {
            type: Number, // Le CIN est stocké comme une chaîne de caractères
            required: true,
            validate: {
                validator: function(value) {
                    // Vérification que le CIN est composé de 8 chiffres
                    return /^\d{8}$/.test(value);
                },
                message: "Le CIN doit être composé de 8 chiffres"
        }
    },
    gsm: {
            type: Number, 
            required: true,
    },
    date: {
            type: String,
            default : Date.now()
    },
    duree: {
            type: String, 
            default : Date.now()
    },
    answerDate : {
        type : String,
        default : Date.now()
    }
});

const Certif = mongoose.model('Certif', certifSchema);

module.exports = Certif;