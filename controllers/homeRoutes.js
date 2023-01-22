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

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', async (req, res) => {
  try {
    const profileData = await Post.findAll({
      where: {
        userId: req.session.userId
      },
      include: [
        { 
          model: User,
          attributes: ['firstName', 'lastName']
        }
      ]
    });

    const userPosts = profileData.map((post) => post.get({ plain: true }));
    console.log(userPosts);

    res.render('profile', {
      userPosts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
