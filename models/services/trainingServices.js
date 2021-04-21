const Training = require('../schemas/training')

const createTraining = async (body, userId) => {
  return await Training.create({ ...body, owner: userId })
}

module.exports = {
  createTraining,
}
