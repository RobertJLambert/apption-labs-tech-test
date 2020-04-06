var express = require('express')
var router = express.Router()

/* POST Send Contact info */
app.post('/', function (req, res) {
  res.render('s', { email: req.body.email });
});

module.exports = router
