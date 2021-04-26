const {
  createTraining,
  totalPagesCount,
  findUserTraining,
} = require('../models/services/trainingServices')

const startTraining = async (req, res, next) => {
  try {
    const userId = req.user.id
    const pagesTotal = await totalPagesCount(req.body.books)
    const newTraining = await createTraining(req.body, pagesTotal, userId)
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
    let index = null
    training.progress.find((oneDay, indx) => {
      if (oneDay.date == date) {
        index = indx
        return
      }
    })
    if (index) {
      training.progress[index].pages += pages
    } else {
      training.progress.push({ date, pages })
    }
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
