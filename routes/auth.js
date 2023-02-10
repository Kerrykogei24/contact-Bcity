const express = require('express');
const router = express.Router()
const { login, register, user } = require('../controllers/auth')


router.post('/register', register)
router.post('/login', login)
router.route('/users').get(user)



module.exports = router