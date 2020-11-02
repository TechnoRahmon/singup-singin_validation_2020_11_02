var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');//import index 
var usersRouter = require('./routes/singup');//import singup
var apiRoutes = require('./routes/Routes') //import reoutes
PORT= 3000;
var app = express();
require('pug')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// make the static file
app.set('views engine',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')));




//Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://dbAdmin:108400@cluster1.tzijx.gcp.mongodb.net/Users?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
var db = mongoose.connection;



//api routes
app.use('/api',apiRoutes)

app.use('/', indexRouter);
app.use('/singup', usersRouter);







app.listen(PORT,()=>{
  console.log('Server running at port:'+PORT);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

})