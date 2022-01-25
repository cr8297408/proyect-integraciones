const express = require('express');
const request = require('request')

require('dotenv').config();

const router = express.Router();

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const auth = { user: CLIENT_ID, pass: CLIENT_SECRET }

const URL_BACK = process.env.URL_BACK;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'


// rutas
router.post('/pago', async (req, res) => {
    console.log("New request POST to paypal/pago");

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body: req.body,
        json: true
    }, (err, response) => {
        res.json(response.body.links[1])
    })
});

module.exports = router;
