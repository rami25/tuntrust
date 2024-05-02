const User   = require('../models/user');
const Certif = require('../models/certif');

const listUsers = async(req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addUser = async(req, res) => {
    try{
        let new_user = new User({
            nom: req.body.nom,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password
            });
            await new_user.save()
            res.send('sauvegarde effectué avec succée!')
    }
    catch(err){
        console.log(err);
    }
}

const updateUser = async(req, res) => {
    try{
        await User.findOneAndUpdate({_id:req.params.id},
            {
            password: req.body.password
        })
        res.send("mise a jour avec succée!");
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
        res.send("Supprimé avec succès!");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const listCertifs = async(req, res) => {
    try {
      const certificates = await Certif.find({});
      res.json(certificates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

const listComments = async(req, res) => {
}

module.exports = { listUsers, listCertifs, listComments, addUser, updateUser, deleteUser };