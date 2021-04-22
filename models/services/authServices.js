const User = require('../schemas/user')

const findUserByEmail = async email => {
  const user = await User.findOne({ email })
  return user
}

const createNewUser = async (email, password, name) => {
  const user = new User({ email, name })
  user.setPassword(password)
  await user.save()
  return user
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

module.exports = {
  findUserByEmail,
  createNewUser,
  updateToken,
}
