var express = require('express');
var router = express.Router();

router.get('/users/:id', function (req, res, next) {
  // check for token header
  console.log(req.params.id);
  res.json({
    app_name: 'News Search System'
  });
});

router.post('/login', function (req, res, next) {
  // CryptoJS
  // Use username as a special key
  // encrypt password
});

module.exports = router;
