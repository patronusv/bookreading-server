const User = require('../schemas/user')

const findUserByEmail = async email => {
  const user = await User.findOne({ email })
  return user
}

const createNewUser = async (email, password, name) => {
  const user = new User({ email, name })
  password && user.setPassword(password)
  await user.save()
  return user
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateRefreshToken = async (id, refreshToken) => {
  return await User.updateOne({ _id: id }, { refreshToken })
}

const findUserByToken = async token => {
  const user = await User.findOne({ token })
  return user
}

const changeTrainingStatus = async id => {
  const user = await User.findOne({ _id: id })
  await user.updateOne({ activeTraining: !user.activeTraining })
}

module.exports = {
  findUserByEmail,
  createNewUser,
  updateToken,
  updateRefreshToken,
  findUserByToken,
  changeTrainingStatus,
}
