const express = require('express');
const router = express.Router();
const Certif = require('../models/certif');
const User = require('../models/user');

// Middleware d'authentification de l'administrateur
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// Récupérer la liste des utilisateurs
router.get('/users', adminAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Récupérer la liste des demandes de certificats
router.get('/certificates', adminAuthMiddleware, async (req, res) => {
    try {
      // Utilisez la connexion à la base de données des administrateurs
      const certificates = await Certif.find({});
      res.json(certificates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;