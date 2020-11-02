var express = require('express');
var router = express.Router();
var path= require('path')
var loginRouter = require('./Routes') //import reoutes
const active = require('../controllers/accountControlller')

/* GET singup page. */
router.get('/', function(req, res, next) {
  active.active.pop()
  res.render('singup.pug',{errors:{display:'none'}});
  
});

//singup confirmation 
router.get('/confirm',(req,res)=>{
    res.render('confirm.pug')
})
//login route
router.use('/login', loginRouter)

//get into profile 
router.get('/myProfile',(req,res)=>{
    console.log(active.active);
    res.render('profile.pug',{user:active.active})
})


module.exports = router;
