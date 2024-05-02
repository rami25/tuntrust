const express = require('express');
const router = express.Router();

router.post("/demande", async (req, res) => {
    console.log("done");
    try {
      const new_certif = new Certif({
        certificat: req.body.certificat,
        nom: req.body.nom,
        // prenom: req.body.prenom,
        // email: req.body.email,
        cin: req.body.cin,
        // gsm: req.body.gsm,
        // date: req.body.date,
        // duree: req.body.duree
      });
    //   const certif = await Certif.create(new_certif);
    //   await certif.save();
      await new_certif.save();
      res.status(200).send('Demande soumise avec succès!');
    } catch (err) {
      console.log(err);
      res.status(500).send('Une erreur est survenue lors de la soumission de la demande.');
    }
  });

module.exports = router;