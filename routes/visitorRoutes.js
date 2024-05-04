const express = require("express");
const User = require("../models/user");
const Admin = require("../models/admin");
const { hashPassword } = require('../env');
const { signJwt } = require('../auth');

const router = express.Router();

//hedha just for testing
router.post('/create', async (req, res) => {
    const { login, password } = req.body;
    try{
        const admin = new Admin({
            login : login,
            password : password
        });
        await admin.save();
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

    let existing = null;
    if (login === 'adminTuntrust' && password === '14660624') {
        existing = await Admin.findOne().where("login").equals(login);
    }
    else
        existing = await User.findOne().where("login").equals(login);

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