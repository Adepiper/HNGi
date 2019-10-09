const localStrategy = require('passport-local').Strategy
const mongoose = require ('mongoose')
const bcrypt = require('bcryptjs')


//intern User Model
const IUser = require('../models/userIntern')

//Mentor User Module








module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done)=>{
            //match user
            IUser.findOne({email: email})
                .then(user => {
                    if(!user){
                        return done(null, false, {message: 'That email is not registered'})
                    }
                    
                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err

                        if(isMatch){
                            return done(null, user)
                        } else {
                            return done(null, false, {message: 'password incorrect'})
                        }

                    })
                })
                .catch(err => console.log(err))
        })
    )
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done)=> {
        IUser.findById(id, (err, user) => {
          done(err, user);
        });
      });
}