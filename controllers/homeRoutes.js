const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    

    // Pass serialized data and session flag into template
    res.render('homepage', { 
        posts, 
        ...posts.users,
        logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [
            User
          ]
        }
      ],
    });

    const post = postData.get({ plain: true });

    console.log(post)

    res.render('post', {
      ...post,
      ...post.comments,
      ...post.users,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password']},
    include: [
      Post,
    ]
  });
  let user = userData.get({ plain: true });
  res.render('profile', {
    ...user,
    ...user.posts,
    logged_in: true
  });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
