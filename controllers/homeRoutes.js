const router = require('express').Router();
const { Blog, User } = require('../models');

// Router to display all blog posts
router.get('/', async (req, res) => {  
  try {
    const blogData = await Blog.findAll({
      include: [{
        model: User,
          attributes: {
            exclude: ["password"]
          },
        }]
    });

    // Get the necessary data
    const filteredBlogs = blogData.map(blog => blog.get({ plain: true }));
    res.render('homepage', {filteredBlogs, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.render('dashboard', {loggedIn: req.session.loggedIn});
  } else {
    res.render('login');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

// Checking for the login 
router.post('/login', async (req, res) => { 
  try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.email,
        },
      });
      
      if (!dbUserData) {
        res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
    
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
      
    req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
      });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;