//import book model 
Account = require('../models/AccountsModel'); 
const path = require('path')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const url = require('url')
var active = []

//Handle view all accounts 

exports.viewall=(req,res)=>{
    Account.get((err,account)=>{
        if(err){
            res.json({
                status:"error",
                message:err,
            })
        }
        res.json({
            status:"success",
            message:"account retrieved successfully",
            data : account
        })
    })
}
//user : { firstname , lastname , email , password }
//Handle Create book actions 

exports.new = (req,res)=>{

    const errors = validationResult(req)
   if(!errors.isEmpty()){
        var err = errors.array()
       console.log(err[0]);
        console.log('true');
        return res.status(402).render('singup.pug',{errors:{content:errors.array(),display:"block"}})
   }
    var account = new Account(); 
    account.f_name= req.body.f_name? req.body.f_name: account.f_name ; 
    account.l_name = req.body.l_name; 
    account.email = req.body.email;
    account.birthday = req.body.birthday; 
    //account.password=req.body.password;
    let saltRounds = 10 ; 
     bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
      if (err) throw err  
      console.log(hash);
     
      account.password = hash;
      //save the Account and check for err 
      account.save((err)=>{
        if (err) res.json(err)
        let dir =path.normalize(__dirname+'/..')
        console.log('saveing');
        res.redirect('/confirm')
            })
   
         })

  
}


//Handle view Account info 

exports.view = (req,res)=>{
    console.log(req.body.email);
     Account.findOne({email : req.body.email},(err,user)=>{
         if(err)res.send(err)
        if (user){

            try {
                
                 bcrypt.compare(req.body.password,user.password,(err,result)=>{

                    console.log(result);
                    if(result){
                        active.push(user)
                        res.redirect('/myprofile')
                    
                    }else{
                        res.status(400).render('login.pug',{errors:{content:[{msg:'UNVALID PASSWORD'}],display:'block'}})
                    }
                 })
             


            } catch (error) {
                res.status(500).json({err:error.message})
            }
        

        }else{
            res.status(400).render('login.pug',{errors:{content:[{msg:'UNVALID USER'}],display:'block'}})
        }
      
     })
    



 
}

//Handle update Account info 


exports.update=(req,res)=>{
    Account.findById(req.params.account_id,(err,account)=>{
        if(err)res.send(err)
        account.f_name= req.body.f_name? req.body.f_name: account.f_name ; 
        account.l_name = req.body.l_name; 
        account.email = req.body.email; 
        account.password = req.body.password; 

        //save the update and check for error 
        account.save((err)=>{
            if(err)res.json(err)

            res.json({
                message:"account info updated!",
                data :account
            })
        })
    })
}

//Handle delete Account 

exports.delelte = (req,res)=>{
    Account.deleteOne({
        _id:req.params.account_id
    },(err,account)=>{
        if (err)res.send(err)
        res.json({
            status:"success",
            message:"account deleted!",
            
        })
    })
}


// handel login account 



//hashing password! 

// const HashPass =(pass)=>{
//         let saltRounds = 10 ; 
//            bcrypt.hash(pass,saltRounds,(err,hash)=>{
//             if (err) throw err  
//             console.log(hash);
//             return hash
//           })
// }

module.exports.active = active