const express = require('express')
const router = express.Router()
const guard = require('../../utils/guard')
const refreshGuard = require('../../utils/refreshGuard')
const { registerRequire } = require('../../utils/registerRequire')
const { loginRequire } = require('../../utils/loginRequire')
const { validateUserFields } = require('../../utils/authValidate')
const authControllers = require('../../controllers/authControllers')

router.post(
  '/register',
  registerRequire,
  validateUserFields,
  authControllers.register
)
router.post('/login', loginRequire, validateUserFields, authControllers.login)
router.post('/logout', guard, authControllers.logout)
router.post('/refresh', refreshGuard, authControllers.refresh)

router.get('/google', authControllers.googleAuth)
router.get('/google-redirect', authControllers.googleRedirect)
router.post('/user', authControllers.googleLogin)

module.exports = router
