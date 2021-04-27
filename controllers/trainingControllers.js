const {
  createTraining,
  totalPagesCount,
  findUserTraining,
  changeBookStatus,
} = require('../models/services/trainingServices')

const startTraining = async (req, res, next) => {
  try {
    const userId = req.user.id
    const endSteps = await totalPagesCount(req.body.books)
    const newTraining = await createTraining(req.body, endSteps, userId)
    await changeBookStatus(req.body.books, 'Reading')
    return res.status(201).json({
      code: 201,
      training: newTraining,
    })
  } catch (e) {
    next(e)
  }
}

const addTrainingPages = async (req, res, next) => {
  try {
    const { date, pages } = req.body
    const userId = req.user.id
    const training = await findUserTraining(userId)
    if (!training) {
      return res.status(400).json({
        code: 400,
        message: 'Training not found',
      })
    }
    let index = -1
    for (const [indx, oneDay] of training.progress.entries()) {
      if (oneDay.date === date) {
        index = indx
        break
      }
    }
    if (index < 0) {
      training.progress.push({ date, pages })
    } else {
      training.progress[index].pages += pages
    }
    training.pagesRead += pages
    await training.save()
    return res.status(201).json({
      code: 201,
      training: training,
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  startTraining,
  addTrainingPages,
}
