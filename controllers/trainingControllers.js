const {createTraining} = require('../models/services/trainingServices')

const startTraining = async (req, res, next) => {
  const { startDate, finishDate, books } = req.body
  const userId = req.user.id

  try {
    if (!startDate || !finishDate) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required field',
      })
    } else {
      const newTraining = await createTraining(req.body, userId)

      return res.json({
        status: 'success',
        code: 201,
        data: newTraining,
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  startTraining,
}
