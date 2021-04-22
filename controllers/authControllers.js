const jwt = require('jsonwebtoken')
const axios = require('axios')
const queryString = require('query-string')
const { v4 } = require('uuid')
const authServices = require('../models/services/authServices')
const { getBook } = require('../models/services/bookServices')

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body
    const user = await authServices.findUserByEmail(email)
    if (user) {
      return res.status(409).json({
        code: 409,
        message: 'Email in use',
      })
    }
    const newUser = await authServices.createNewUser(email, password, name)
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
    const books = await getBook(user.id)
    return res.status(200).json({
      code: 200,
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        books: books,
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

const googleAuth = async (req, res, next) => {
  try {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    })
    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    )
  } catch (err) {
    next(err)
  }
}

const googleRedirect = async (req, res, next) => {
  try {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    const urlObj = new URL(fullUrl)
    const urlParams = queryString.parse(urlObj.search)
    const code = urlParams.code
    const tokenData = await axios({
      url: 'https://oauth2.googleapis.com/token',
      method: 'post',
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
        grant_type: 'authorization_code',
        code,
      },
    })
    const userData = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    })

    let user = await authServices.findUserByEmail(userData.data.email)
    if (!user) {
      user = await authServices.createNewUser(
        userData.data.email,
        false,
        userData.data.name
      )
    }
    const token = v4()
    await authServices.updateToken(user.id, token)
    return res.redirect(`${process.env.FRONTEND_URL}?token=${token}`)
  } catch (err) {
    next(err)
  }
}

const googleLogin = async (req, res, next) => {
  try {
    let { token } = req.body
    if (!token) {
      return res.status(400).json({
        code: 400,
        message: 'Token is required',
      })
    }
    const user = await authServices.findUserByToken(token)
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: 'Wrong token, user not found',
      })
    }
    const payload = {
      email: user.email,
    }
    token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1h',
    })
    await authServices.updateToken(user.id, token)
    const books = await getBook(user.id)
    return res.status(200).json({
      code: 200,
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        books: books,
      },
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login,
  logout,
  googleAuth,
  googleRedirect,
  googleLogin,
}
