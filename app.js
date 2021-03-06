//* Hello!  This is a tech test for Apption Labs and thesse are what you require.... for now...
const express = require('express')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const multer = require('multer')
const emailV = require("email-validator")
const { check, validationResult } = require('express-validator');
const fileSave = require('fs')

const upload = multer()
const port = 3000
const app = express()

const indexRouter = require('./routes/index')
const contactRouter = require('./routes/contact')
// const saveRouter = require('./routes/save')

var siteTitle = 'Tasty Treats'
var contact_msg_filename = 'contact_msgs/save-' + Date.now()

//* view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

//* you're e la routouerz
app.use('/', indexRouter)
app.use('/contact', contactRouter)
// app.use('/save', saveRouter)

//* for parsing form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())
app.use(express.static('public'))

//* Save contact form data 
app.post('/save', [
    //* Sanatise input 
    check('follypot').isEmpty(), 
    check('namez').isLength({ min: 3 }).trim().escape(), 
    check('message').isLength({ max: 1000 }).trim().escape()
], (req, res) => 
{
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() });
  }

  //* validate email
  if (emailV.validate(req.body.email) )
  {
    console.log(req.body.email + " = email true")

    //*Save a file with the contact info
    fileSave.writeFile (contact_msg_filename, JSON.stringify(req.body), function (err) 
    {
      if (err)
        throw err
      
      //- @todo title var should be global
      res.render('save', { title: siteTitle, namez: req.body.namez })
      console.log('Saved message from : ' + req.body.namez)
    })
  } else 
  {
    //- @todo Display an error due to email not validating
    res.redirect('/contact?emailError=1')
    console.log(req.body.email + " = email No Good")
  }
})

app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//* catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404))
})

//* error handler
app.use(function(err, req, res, next) 
{
  //* set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  
  //* render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, ()=> console.log(`Yay!  You've got a Node server on port ${port} : http://localhost:3000`))

module.exports = app