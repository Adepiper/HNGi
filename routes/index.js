const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')

//welcome page
router.get('/', (req, res) => res.render('welcome'))

//dashboard
router.get('/intern/dashboard',  (req, res)=> res.render('internDashboard', {
                userName: req.user.userName}))
router.get('/mentor/dashboard', (req, res) => res.render('mentorDashboard'))





module.exports = router;