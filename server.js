// import express package
const express = require('express');
const sequelize = require('./config/connection');
// Importing handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// Initialize express
const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middleware to access for homeroutes
app.use(require('./controllers/homeRoutes'));

// Set the port
const PORT = process.env.PORT || 3001;

// Listening to the port
sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
     });
});
