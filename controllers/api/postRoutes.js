const router = require('express').Router();
const { User, Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      message: req.body.message,
      userId: req.body.userId ? req.body.userId : req.session.userId
    })

    res.status(201).json({ post: postData, message: 'Your comment has been submitted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;