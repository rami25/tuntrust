const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la destruction de la session:", err);
        res.status(500).json({ error: "Erreur lors de la déconnexion" });
      } else {
        console.log("Session détruite avec succès");
        res.redirect("/login");
      }
    });
  } else {
    console.error("La session n'est pas initialisée");
    res.status(500).json({ error: "Erreur lors de la déconnexion" });
  }
});

module.exports = router;