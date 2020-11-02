

const Router = require('express').Router();// import express router 
const accountControlller = require('../controllers/accountControlller') // import accountControlller 
const {check,validationResult} = require('express-validator')
User = require('../models/AccountsModel')


//set default API response
Router.get('/',(req,resp)=>{
    
    resp.render('login.pug',{errors:{display:'none'}})


})
// account routes

Router.route('/accounts')
//.get(accountControlller.viewall)
    .post([
        check('f_name').notEmpty().withMessage('Enter your first name please')
        .bail()
        .isLength({ min:5}).withMessage('the name must be longer than 5 characters'),

        check('l_name').notEmpty().withMessage('Enter your last name please')
        .bail()
        .isLength({ min:5}).withMessage('the name must be longer than 5 characters'),

        check('birthday').notEmpty().withMessage('Enter birthday please')
        .bail()
        .isDate(),

        check('email').notEmpty().withMessage('Enter your email please').bail()
        .isEmail().withMessage('Invalid Emial')
        .custom((value)=>{return isEmailexisit(value)}).withMessage('The email is already exisist!'),

        check('password').notEmpty().withMessage('Enter your password please')
        .bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.')
        .custom((value,{req})=>{ return value == req.body.password1  
        }).withMessage('Passwords not matched !')
        
    ],accountControlller.new)

Router.route('/singuperror')
    .get((req,res)=>{
            var errors = validationResult(req)
            return res.status(402).render('singup.pug',{errors:{content:errors.array(),display:"block"}})
    })


    
// Router.route('/accounts/:account_id')
//     .get(accountControlller.view)
//     .patch(accountControlller.update)
//     .put(accountControlller.update)
//     .delete(accountControlller.delelte)






//login
Router.route('/login')
    .post(accountControlller.view)








// check the email if it's exisit
const isEmailexisit=async (em)=>{
        await User.findOne({email : em},(err,result)=>{
            if (err) throw err 
            console.log(result);
            if(result){
                console.log('false');
                return false
            }else{
               console.log('true');


                return true
            }
        })
}

//export Router
module.exports = Router