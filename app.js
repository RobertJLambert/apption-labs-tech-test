//* Hello!  This is a tech test for Apption Labs and thesse are what you require.... for now...
const express = require('express')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const multer = require('multer')
const emailV = require("email-validator")

const upload = multer()
const port = 3000
const app = express()

const indexRouter = require('./routes/index')
const contactRouter = require('./routes/contact')
// const saveRouter = require('./routes/save')

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
app.post('/save', function (req, res) 
{
  // console.log(req.body)
  // res.send('WE got ya')

  //* Save a file with the contact info -- NOTE this require should be moved up top.. of this file.. with the others.. obvs
  var fs = require('fs')
  
  //* validate email
  if (emailV.validate(req.body.email) )
  {
    console.log(req.body.email + " = email true")
  
    fs.writeFile ('contact_msgs/save-' + Date.now(), JSON.stringify(req.body), function (err) 
    {
      if (err)
        throw err
  
      res.render('save', { title: 'Tasty Treats' })
      console.log('Saved message from : ' + req.body.namez)
    })
  }
  else
    console.log(req.body.email + " = email No Goood")
})

app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//* catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});  

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