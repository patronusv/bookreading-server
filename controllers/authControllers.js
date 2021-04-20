const jwt = require('jsonwebtoken')
const authServices = require('../models/services/authServices')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authServices.findUserByEmail(email)
    if (user) {
      return res.status(409).json({
        code: 409,
        message: 'Email in use',
      })
    }
    const newUser = await authServices.createNewUser(email, password)
    if (newUser) {
      return res.status(201).json({
        code: 201,
        user: {
          email: newUser.email,
        },
      })
    }
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authServices.findUserByEmail(email)
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        code: 401,
        message: 'Email or password is wrong',
      })
    }
    const payload = {
      email: user.email,
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1h',
    })
    await authServices.updateToken(user.id, token)
    return res.status(200).json({
      code: 200,
      token: token,
      user: {
        id: user.id,
        email: user.email,
      },
    })
  } catch (err) {
    next(err)
  }
}

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user
    await authServices.updateToken(_id, '')
    return res.status(204).json()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login,
  logout,
}
