const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
  if (res.locals.userId) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la destruction de la session:", err);
        res.status(500).json({ msg: "Erreur lors de la déconnexion" });
      } else {
        console.log("Session détruite avec succès");
        res.status(200).json({ msg: "Session détruite avec succès"});
        // res.redirect("/login");
      }
    });
  } else {
    console.error("La session n'est pas initialisée");
    res.status(500).json({ msg: "Erreur lors de la déconnexion" });
  }
});

module.exports = router;