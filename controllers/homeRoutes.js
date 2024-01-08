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
    res.render('homepage', {filteredBlogs, loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Router which checks for logged in user else redirect to login page. If it has a session user, then navigates to the dashboard
router.get('/dashboard', async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const blogData = await Blog.findAll({
        include: [{
        model: User,
          attributes: {
            exclude: ["password"]
          },
          where: {
          user_id: req.session.sessionUserId,
        },
        }]
      });

      const filteredUserBlogs = blogData.map(blog => blog.get({ plain: true })); 
      res.render('dashboard', { filteredUserBlogs, loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName });
      
    } catch (err) {
      res.status(500).json(err);
    }
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
      req.session.sessionUserId = dbUserData.dataValues.user_id;
      req.session.sessionUserName = dbUserData.dataValues.first_name + " " + dbUserData.dataValues.last_name;
      res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// Router for logout option
router.post('/logout', (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
      res.render('login');
    } else {
      res.status(404).end();
      res.render('login');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog', (req, res) => {
    res.render('blog', {loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
});

// Router to Save the Blog
router.post('/blog', async (req, res) => {
  try {
    const saveBlogData = await Blog.create({
      user_id: req.session.sessionUserId,
      blog_title: req.body.blog_title,
      blog_post: req.body.blog_post,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(saveBlogData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display the sign-up page
router.get('/signup', async (req, res) => { 
  res.render('signup');
});

// Route for the sign-up functionality
router.post('/signup', async (req, res) => { 
  try {
    const signupData = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.sessionUserId = signupData.dataValues.user_id;
      req.session.sessionUserName = signupData.dataValues.first_name + " " + signupData.dataValues.last_name;
      res.status(200).json({ user: signupData, message: 'You are now signed up in the application!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/deletepost', async (req, res) => {
  try {
    const deleteBlog = await Blog.destroy({
      where: {
        blog_id: req.body.targetId,
      }
    });

    res.status(200).json("{message:Deleted category data}");
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;