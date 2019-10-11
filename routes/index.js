const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')

//welcome page
router.get('/', (req, res) => res.render('welcome'))

//dashboard
router.get('/intern/dashboard',  (req, res)=> res.render('internDashboard'))
router.get('/mentor/dashboard', (req, res) => res.render('mentorDashboard'))
router.get('/about', (req, res) => res.render('about'))
router.get('/classroom',  (req, res)=> res.render('classroom', {
    name: req.user.userName}))
router.get('/complaintForm', (req, res) => res.render('complaint-form'))
router.get('/faq', (req, res) => res.render('faq'))






module.exports = router;