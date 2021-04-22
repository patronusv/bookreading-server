module.exports.registerRequire = (req, res, next) => {
  const { email, password, name } = req.body
  let requireMessage = ''
  if (!email) {
    requireMessage += 'Email is required. '
  }
  if (!password) {
    requireMessage += 'Password is required. '
  }
  if (!name) {
    requireMessage += 'Name is required.'
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
