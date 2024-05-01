const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherchez l'utilisateur dans la base de données par email
    const user = await User.findOne({ email });

    // Vérifiez si l'utilisateur existe
    if (!user) {
      return res.status(401).json({ message: "Adresse e-mail non valide ou mot de passe incorrect" });
    }

    // Comparez le mot de passe fourni avec le mot de passe dans la base de données (sans hachage)
    if (password !== user.password) {
      return res.status(401).json({ message: "Adresse e-mail non valide ou mot de passe incorrect" });
    }

    // Si les identifiants sont corrects, vous pouvez générer un token JWT pour l'authentification ultérieure
    // Ensuite, renvoyez une réponse indiquant que l'authentification a réussi
    res.status(200).json({ message: "Authentification réussie" });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la tentative de connexion" });
  }
});






// Authentification de l'administrateur
router.post("/admin/login", async (req, res) => {
  const { login, password } = req.body;
  try {
    if (login === 'adminTuntrust' && password === '14660624') {
      res.status(200).json({ message: "Authentification réussie en tant qu'administrateur" });
    } else {
      res.status(401).json({ message: "Échec de l'authentification de l'administrateur" });
    }
  } catch (error) {
    console.error("Erreur lors de la connexion admin:", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la tentative de connexion admin" });
  }
});





module.exports = router;
