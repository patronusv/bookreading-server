module.exports.loginRequire = (req, res, next) => {
  const { email, password } = req.body
  let requireMessage = ''
  if (!email) {
    requireMessage += 'Email is required. '
  }
  if (!password) {
    requireMessage += 'Password is required.'
  }
  requireMessage.trim()
  if (requireMessage) {
    return res.status(400).json({
      code: 400,
      message: requireMessage,
    })
  }
  next()
}
