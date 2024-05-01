const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session'); // Importez express-session
const dotenv = require('dotenv');

const User = require("./models/user");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes"); // Importez le routeur pour les routes d'authentification
const Certif = require('./models/certif');
const logoutRoutes = require("./routes/logoutRoutes");
const adminRoutes = require('./routes/adminRoutes'); // Ajoutez les routes de l'administrateur
const adminModel = require('./models/admin'); // Importez le modèle d'administrateur
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(session({
    secret: 'secret',
    cookie: {maxAge : 60000},
    resave: false,
    saveUninitialized: true
}));

app.use(logoutRoutes);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// const DATABASE_URL = process.env.DATABASE_URL;
//'mongodb+srv://tuntrust:tuntrust1234567@cluster0.bektwm2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const url = 'mongodb+srv://root:ramibenmrad105@cluster0.b3adovy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(url),(err,done) => {    
if (err){
    console.log(err)
}
if(done){
   console.log('base de donnée connecté avec succés! ')   
}}

 // Route pour soumettre une demande
 app.post("/demande", async (req, res) => {
    try {
      const new_certif = new Certif({
        certificat: req.body.certificat,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        cin: req.body.cin,
        gsm: req.body.gsm,
        date: req.body.date,
        duree: req.body.duree
      });
      await new_certif.save();
      res.status(200).send('Demande soumise avec succès!');
    } catch (err) {
      console.log(err);
      res.status(500).send('Une erreur est survenue lors de la soumission de la demande.');
    }
  });

// Utilisez le routeur pour les routes d'authentification
app.use(authRoutes);
app.use(adminRoutes); // Utilisez les routes de l'administrateur
app.use(commentRoutes);

app.get("/users", async (req, res) => {
try { 
    await User.find({}).then((result) => {
        res.send(result);
    });
}catch (err) {
    console.log(err);
}
});

app.delete('/supprimer/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        res.send("Supprimé avec succès!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/maj/:id', async (req, res) => {
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
});

app.post("/ajouter_user" , async(req,res) =>{
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
});

const router = express.Router()
 router.get('/kahwa',(req,res)=>{
    res.send("Bonjour Nadou")
})
app.use('/',router)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Serveur en marche");
}) 