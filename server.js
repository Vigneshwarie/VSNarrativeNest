// import express package
const express = require('express');
const sequelize = require('./config/connection');

// Initialize express
const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The root URL to perform task
app.get('/', (req, res) => res.send('Hello World'));

// Set the port
const PORT = process.env.PORT || 3001;

// Listening to the port
sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
     });
});
