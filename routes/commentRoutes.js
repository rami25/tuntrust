
// routes/commentRoutes.js

const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/comments', async (req, res) => {
  try {
    const { nom, commentaire } = req.body;
    const newComment = new Comment({ nom, commentaire });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint pour récupérer tous les commentaires
router.get('/comments', async (req, res) => {
  try {
    // Récupérer tous les commentaires de la base de données
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;