const express = require('express');
const app = express();
const routes = require('./routes');
const sequelize = require('./config/database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'handlebars');

app.use('/', routes);

sequelize.sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
