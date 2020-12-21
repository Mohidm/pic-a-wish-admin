const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const config = require("../config/db")

const AdminSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const Admin = module.exports = mongoose.model("Admin",AdminSchema)

module.exports.getAdminUserById = (id, callback)=>{
Admin.findById(id, callback)
}
module.exports.getAdminUserByEmail = (email, callback)=>{
    const query = {email: email}
    Admin.findOne(query, callback)
}
module.exports.addAdminUser = (newUser, callback)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
           if(err) throw err
           newUser.password = hash
           newUser.save(callback)
        });
    });
}
module.exports.comparePassword= (candidatePassword, hash, callback)=>{
    bcrypt.compare(candidatePassword, hash,(err, isMatch)=>{
        if(err) throw err
        callback(null, isMatch)
    })
}
