const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  if(req.session._id){
    res.locals.userId = req.session._id;
    next();
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

module.exports = router;