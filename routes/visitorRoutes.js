const express = require("express");
const User = require("../models/user");
const Admin = require("../models/admin");
const Comment = require("../models/comment");
const Certif = require("../models/certif");
const Reservation = require("../models/reservation");
const { hashPassword } = require('../env');
const { signJwt } = require('../auth');

const router = express.Router();

//hedha just for testing
router.post('/create', async (req, res) => {
    const { userId, date, time } = req.body;
    try{
        const user = await User.findById(userId);
        const com = new Reservation({
            nom : user.nom,
            email : user.email,
            date,
            time
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