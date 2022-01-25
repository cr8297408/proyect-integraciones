const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const passport = require('passport');
const port = process.env.PORT_BACK;
const public_routes = require('./routes/public');
const auth_routes = require('./routes/auth');
const payment_routes = require('./routes/payment');

require('./services')
app.use(passport.initialize());
// Add headers before the routes are defined
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Agregando nuestras rutas
app.use(public_routes);
app.use(auth_routes);
app.use(payment_routes);


//coment

app.listen(port, function() {
  console.log(`App listening the port [${port}]!`);
});



