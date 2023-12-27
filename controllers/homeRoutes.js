const router = require('express').Router();

// Created a main handler under views and created a route to render the page.
router.get('/', async (req, res) => {
  res.render('hello');
});

module.exports = router;