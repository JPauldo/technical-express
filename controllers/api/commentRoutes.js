const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;