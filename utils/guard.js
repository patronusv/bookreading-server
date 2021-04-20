const passport = require('passport')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err || 'Bearer ' + user.token !== req.headers.authorization) {
      return res.status(401).json({
        code: 401,
        message: 'Not authorized',
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

module.exports = guard
