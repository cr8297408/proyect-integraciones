const express = require('express');
const router = express.Router()

router.get('/', function(req, res){
    console.log(' Peticion GET a /');
    res.send('Hello World!');
});

router.get('/success', (req, res) =>{
    res.send('success');
});

router.get('/failure', (req, res) =>{
    res.send('failure');
});

router.get('/pending', (req, res) =>{
    res.send('pending');
});

module.exports = router;