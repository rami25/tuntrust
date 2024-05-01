// adminAuthMiddleware.js
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  const { login, password } = req.body;
  if (login === 'adminTuntrust' && password === '14660624') {
    // Si les identifiants sont corrects, continuez
    next();
  } else {
    // Sinon, renvoyez une erreur d'authentification
    res.status(401).json({ message: 'Authentication failed' });
  }
});

module.exports = router;
