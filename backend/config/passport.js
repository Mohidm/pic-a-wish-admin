const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const User =require("../models/admin")
const config = require("../config/db")

module.exports= (passport)=>{
    let opts={}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = config.secret
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
      
        User.getAdminUserById(jwt_payload.user._id,(err, user)=>{
            console.log(jwt_payload)
            if(err){
                return done(err, false)
                
            }
            if(user){
                return done(null, user)
            }else{
                return done(null, false)
            }
        })
    }))
}