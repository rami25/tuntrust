const express = require("express");
const User = require("../models/user");
const Admin = require("../models/admin");
const Comment = require("../models/comment");
const Certif = require("../models/certif");
const { hashPassword } = require('../env');
const { signJwt } = require('../auth');

const router = express.Router();

//hedha just for testing
router.post('/create', async (req, res) => {
    const { certificat, nom, prenom, email, cin, gsm } = req.body;
    try{
        const com = new Certif({
            certificat,
            nom,
            prenom,
            email,
            cin,
            gsm,
            date : Date.now(),
            duree : Date.now()
        });
        await com.save();
        res.status(200).send('admin creer avec succès!');
    } catch (err) {
      console.log(err);
      res.status(500).send('Une erreur est survenue lors de la soumission de la demande.');
    }
});

router.post('/login', async (req, res) => {

    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).send({ error: 'all fields are required' });
    }

    const existing = await User.findOne().where("login").equals(login) ||
    await Admin.findOne().where("login").equals(login);
    // if (!existing || existing.password !== hashPassword(password)) {
    if (!existing || existing.password !== password) {
        return res.status(403).send({error: 'unauthorized'})
    }

    const jwt = signJwt({ userId: existing._id });
    res.status(200).send({
        existing,
        jwt
    });

});

module.exports = router;