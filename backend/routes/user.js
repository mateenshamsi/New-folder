const express = require('express')
const router = express.Router()
const {handleUserSignup, handleUserLogin} = require('../controller/user')
const catchAsync = require('../utils/catchAsync')

router.post('/signup',catchAsync(handleUserSignup)) 
router.post('/login',catchAsync(handleUserLogin)) 
