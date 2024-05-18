const User   = require('../models/user');
const Certif = require('../models/certif');
const Comment = require("../models/comment");
const Reservation = require("../models/reservation");

const listUsers = async(req, res) => {
    try {
        const users = await User.find({});
        res.json({users});
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const addUser = async(req, res) => {
    try{
        let new_user = new User({
            nom: req.body.nom,
            email: req.body.email,
            password: req.body.password,
            });
            await new_user.save()
            res.send({ msg : 'sauvegarde effectué avec succée!'})
    }
    catch(err){
        console.log(err);
        res.send({ msg : 'echec!!!'})
    }
}

const updateUser = async(req, res) => {
    try{
        await User.findOneAndUpdate({_id:req.params.id},
        {
            nom : req.body.nom,
            email : req.body.email
        })
        res.send({ msg : "mise a jour avec succée!"});
    }
    catch(err)
    {
        res.send(err)
    }
}

const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        res.send({msg : "Supprimé avec succès!"});
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const listCertifs = async(req, res) => {
  try {
    const certificates = await Certif.find({ status : 'en attente'});
    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

const listdCertifs = async(req, res) => {
  try {
    const certificates = await Certif.find({ status : { $in : ['accepted', 'rejected'] }});
    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

const ansCertif = async(req, res) => {
  const { _id, ans} = req.body;
  try {
    await Certif.findByIdAndUpdate(_id,{status : ans, answerDate : Date.now()}, {new : true});
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

const listComments = async(req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }    
}

const listReservs = async(req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }    
}

module.exports = { listUsers,
                   listCertifs,
                   listdCertifs,
                   listComments,
                   addUser,
                   updateUser,
                   deleteUser,
                   ansCertif,
                   listReservs
                 };