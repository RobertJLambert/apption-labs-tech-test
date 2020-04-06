var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Tasty Treats', sub_title: 'Your local bakery' })
})

module.exports = router
