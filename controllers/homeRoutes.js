const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { 
          model: User,
          attributes: ['firstName', 'lastName']
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {});
router.get('/signup', (req, res) => {});
router.get('/profile', (req, res) => {});
router.get('/post/:id', (req, res) => {});

module.exports = router;
