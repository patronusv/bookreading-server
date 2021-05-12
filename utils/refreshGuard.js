const passport = require('passport')

const refreshGuard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (
      !user ||
      err ||
      'Bearer ' + user.refreshToken !== req.headers.authorization
    ) {
      return res.status(401).json({
        code: 401,
        message: 'Not authorized or no token provided',
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

module.exports = refreshGuard
