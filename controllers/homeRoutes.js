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
    const profileData = await Post.findByPk(req.session.userId, {
      include: [
        { 
          model: User,
          attributes: ['firstName', 'lastName']
        }
      ]
    });
    console.log(profileData);

    const userPosts = profileData.map((userPost) => userPost.get({ plain: true }));

    console.log(userPosts);

    res.render('profile', {
      userPosts
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName']
        },
      ]
    });

    const commentData = await Comment.findAll({
      where: {
        postId: req.params.id
      }, 
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName']
        }
      ]
    });
    console.log(postData.get({ plain: true }));
    
    const post = postData.get({ plain: true });
    console.log('Raw Data', postData);
    console.log('Post', post);

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log('Raw Data', commentData);

    console.log('Comment', comments);

    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
