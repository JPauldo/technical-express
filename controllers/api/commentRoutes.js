const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      message: req.body.message,
      postId: req.body.postId ? req.body.postId : req.session.postId,
      userId: req.body.userId ? req.body.userId : req.session.userId
    });

    res.status(201).json({ comment: commentData, message: 'Your post has been posted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;