var express = require('express')
var router = express.Router()

/* POST Send Contact info */
router.post('/', (req, res, next) => 
{
  console.log(req.body)
  res.render('save', { title: 'Tasty Treats', sub_title: 'Your local bakery' })
  // res.send("We certainliii recieved your request!")
})

module.exports = router
