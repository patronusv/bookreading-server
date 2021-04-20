const validator = require('validator')

module.exports.validateUserFields = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      code: 400,
      message: 'Missing required email or password field.',
    })
  }
  let validationMessage = ''
  if (!validator.isEmail(email)) {
    validationMessage += 'Email validation failed. '
  }
  if (!validator.isStrongPassword(password)) {
    validationMessage +=
      'Password validation failed: min length - 8, min lowercase - 1, min uppercase - 1, min numbers - 1, min symbols - 1.'
  }
  validationMessage.trim()
  if (validationMessage) {
    return res.status(400).json({
      code: 400,
      message: validationMessage,
    })
  }
  next()
}
