const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;
const public_routes = require('./routes/public')
const auth_routes = require('./routes/auth')

// Add headers before the routes are defined
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Agregando nuestras rutas
app.use(public_routes);
app.use(auth_routes);

//coment

app.listen(port, function() {
  console.log(`App listening the port [${port}]!`);
});



