const express = require('express');
const router = express.Router();
const passport = require('passport');
const strategy_name = 'facebook';
require('dotenv').config()

// session:false --> no se trabaja con secciones, sino con tokens
// esta direccion debe de coincidir con lo que configuremos en el boton
router.get(`/${strategy_name}/auth`, passport.authenticate(strategy_name, { session:false, scope: ['email']}));

// esta debe de coincidir con la del .env
router.get(`/${strategy_name}/callback`, 
  passport.authenticate(strategy_name, { session:false, failureRedirect: '/failed' }),
  function(req, res) {
    console.log(`Peticion Get ${strategy_name}/callback`);

    // obtener los datos de google
    const data = req.user._json;
    console.log('datos: ');
    console.log(data);

    const token = "hgjsd8fs6g7s7df67g6sdf43sdg2s3df5sg6s7df7"

    const url_front = process.env.URL_FRONT+`/?token=${token}`;

    res.redirect(301, url_front);
});

module.exports = router;