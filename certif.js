const mongoose = require('mongoose');

const certifSchema = new mongoose.Schema({
    certificat: {
        type: String,
        required: true,
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
    required: true,
    match: [
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Format d'email incorrect"
    ],
    unique: true,
   },
   cin: {
    type: String, // Le CIN est stocké comme une chaîne de caractères
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
    type: Number, // ou Number si vous souhaitez stocker le numéro de téléphone comme un nombre
    required: true,
   },
   date: {
    type: String,
    required: true,
   },
   duree: {
    type: String, // ou Number si vous souhaitez stocker la durée comme un nombre
    required: true,
   }
});

const Certif = mongoose.model('Certif', certifSchema);

module.exports = Certif;