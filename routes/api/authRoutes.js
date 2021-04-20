const express = require('express')
const router = express.Router()
const guard = require('../../utils/guard')
const { validateUserFields } = require('../../utils/authValidate')
const authControllers = require('../../controllers/authControllers')

router.post('/register', validateUserFields, authControllers.register)
router.post('/login', validateUserFields, authControllers.login)
router.post('/logout', guard, authControllers.logout)

module.exports = router
