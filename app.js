const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const trainRoutes = require('./routes/train');
const db = require('./config');

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/train', trainRoutes);

// check database connection status
db.getConnection()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.log('Error connecting to database: ', err);
  });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
