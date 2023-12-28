const router = require('express').Router();
const { Blog, User } = require('../models');

// Router to display all blog posts
router.get('/', async (req, res) => {
  //res.render('hello');
  
  try {
    const blogData = await Blog.findAll();
    console.log(123);
    // Get the necessary data
    const filteredBlogs = blogData.map(blog => blog.get({ plain: true }));
    console.log(filteredBlogs);
    res.render('hello', {filteredBlogs});
  } catch (err) {
    res.status(500).json(err);
  }
 

});

module.exports = router;