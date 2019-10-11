const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const async = require('async')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const randomstring = require('randomstring')
const joi = require('joi')
//intern user model 
const IUser = require('../models/userIntern')
router.get('/login', (req, res) => res.render('login'))

router.get('/register', (req, res) => res.render('internRegister'))


//router.get('/Register/M', (req, res) => res.send('register'))





//Register Handle

router.post('/register', (req, res) => {
   const {firstName,lastName, email, password, password2, userName, phone} = req.body;
    let errors = []
    var Regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    //check required fields

    if(!firstName || !lastName || !email || !password || !password2 || !userName || !phone){
        errors.push({msg: 'please fill all fields'})
    }

    //password missmatch
    if(password !== password2){
        errors.push({msg: 'passwords do not match'})
    }

    //password length
    if(password.length < 6){
        errors.push({msg: 'Passwords should be at least 6 characters'})
    }
 /*  if (password.value !== Regex){
        errors.push({msg: 'Password Weak'})
    }*/
    

    if(errors.length > 0){
        res.render('internRegister', {
            errors,
            firstName,
            lastName,
            email,
            password,
            password2
        })
    } else {
       //validation passed
       IUser.findOne({ email: email})
            .then( user => {
                if(user){
                    //User exists
                    errors.push({msg: 'Email is alredy registered'})
                    res.render('internRegister', {
                        errors,
                        firstName,
                        lastName,
                        email,
                        password,
                        password2
                    })
                }
                else {
                    const newIUser = new IUser({
                        firstName,
                        lastName,
                        email,
                        password,
                        userName,
                        phone
                    })
                    //
                    

                   //encrypt password
                   bcrypt.genSalt(10, (err, salt)=>
                        bcrypt.hash(newIUser.password, salt, (err, hash)=>{
                            if (err) throw err;
                            //encrypt password
                            newIUser.password = hash
                            //save user
                            newIUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You can now log in')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                   }) )
                }
            })
            .catch()
    }
})




//Login handle
router.post('/login', (req, res, next )=> {
    passport.authenticate('local', {
        successRedirect: '/intern/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})


//logout handle
router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success_msg', 'you are logged out')
    res.redirect('/users/login')
})







module.exports = router;