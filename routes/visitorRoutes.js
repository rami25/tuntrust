const express = require("express");
const User = require("../models/user");
const Admin = require("../models/admin");
const Comment = require("../models/comment");
const Certif = require("../models/certif");
const Reservation = require("../models/reservation");
const { hashPassword } = require('../env');
const { signJwt } = require('../auth');

const router = express.Router();

const realTime = (timeString) => {
  const timeMapping = {
    '9h': '09:00:00',
    '10h': '10:00:00',
    '11h': '11:00:00',
    '15h': '15:00:00',
    '16h': '16:00:00'
  };

  return timeMapping[timeString] || '00:00:00';
}

const combineDateTime = (dateString, timeString) => {
  const date = new Date(dateString);
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  return date;
}

router.post('/add-reserv', async (req, res) => {
    const { userId, date, time } = req.body;
    try{
        const Time = realTime(time);
        const tDate = combineDateTime(date, Time);
        const reserv = await Reservation.findOne().where("date").equals(tDate);
        console.log('targetDate : ' + tDate);
        if(reserv){
            console.log('reserv.date' + reserv.date);
            return res.status(200).send({msg : 'Date is already reserved'});
        }
        const user = await User.findById(userId);
        const com = new Reservation({
            nom : user.nom,
            email : user.email,
            date : tDate,
            time
        });
        await com.save();
        res.status(200).send('reservation has been created successfully!');
    } catch (err) {
      console.log(err);
      res.status(500).send('Une erreur est survenue lors de la soumission de la reservation.');
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