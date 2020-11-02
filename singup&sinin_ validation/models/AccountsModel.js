const { hash } = require('bcrypt');
const mongoose = require('mongoose')


//user : { firstname , lastname , email , password }
//setup schema 
var UserSchema = mongoose.Schema({
    f_name :{type:String,require:true, minLength:[5,'Name is too short']},
    l_name:{type:String,require:true, minLength:[5,'Name is too short']},
    email:{type:String,require:true, lowercase:true},
    birthday:{type:String,require:true},
    password:{type:String,require:true},
    add_date:{type:Date,default:Date.now}
})

//Export Accounts Model
var Accounts = module.exports = mongoose.model('accounts',UserSchema); 

module.exports.get = (callback,limit)=>{
    Accounts.find(callback).limit(limit);
}