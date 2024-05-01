// logoutRoutes.js
const express = require("express");
const router = express.Router();

// Route de déconnexion
router.post("/logout", (req, res) => {
  // Vérifiez si la session est initialisée
  if (req.session) {
    // Détruisez la session
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la destruction de la session:", err);
        res.status(500).json({ error: "Erreur lors de la déconnexion" });
      } else {
        console.log("Session détruite avec succès");
        // Redirection vers la page de connexion
        res.redirect("/login");
      }
    });
  } else {
    // Gérer le cas où la session n'est pas initialisée
    console.error("La session n'est pas initialisée");
    res.status(500).json({ error: "Erreur lors de la déconnexion" });
  }
});


module.exports = router;
