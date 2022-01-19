const express = require('express');
const router = express.Router();
const google = require('./google');
const facebook = require('./facebook');


router.post('/login', function(req, res) {
  
  console.log("New request POST to /login");
  
  console.log(req.body)
  
    const token = "hgjsd8fs6g7s7df67g6sdf43sdg2s3df5sg6s7df7"
    
    let data = {
        'success': true,
        'message': `User ${req.body.email} registered correctly`,
        'token': token,
        'data': req.body
      }
    
    res.json(data);
});

router.use('', google);
router.use('', facebook);

router.get('/failed', (req, res) => res.send('Hay un error en el login'));

module.exports = router



