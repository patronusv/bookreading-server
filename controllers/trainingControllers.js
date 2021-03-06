const {
  createTraining,
  totalPagesCount,
  findUserTraining,
  changeBookStatus,
} = require('../models/services/trainingServices')
const { updateBook } = require('../models/services/bookServices')
const { changeTrainingStatus } = require('../models/services/authServices')

const startTraining = async (req, res, next) => {
  try {
    const { startDate, finishDate, books } = req.body
    const booksObj = []
    for (const book of books) {
      booksObj.push({ bookId: book })
    }
    const userId = req.user.id
    const endSteps = await totalPagesCount(req.body.books)
    const newTraining = await createTraining(
      startDate,
      finishDate,
      booksObj,
      endSteps,
      userId
    )
    await changeBookStatus(req.body.books, 'Reading')
    await changeTrainingStatus(userId)
    return res.status(201).json({
      code: 201,
      training: {
        _id: newTraining._id,
        startDate: newTraining.startDate,
        finishDate: newTraining.finishDate,
        books: newTraining.books,
        pagesTotal: newTraining.pagesTotal,
        pagesRead: newTraining.pagesRead,
      },
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
    let done = 0
    for (const oneStep of training.endSteps) {
      if (training.pagesRead >= oneStep.pages) {
        await updateBook(oneStep.book, { status: 'HaveRead' })
        for (const book of training.books) {
          if (book.bookId == oneStep.book) {
            book.status = 'HaveRead'
          }
        }
        done += 1
      }
    }
    if (done > 0) {
      training.endSteps.splice(0, done)
    }
    let toDelete = false
    if (training.endSteps.length === 0) {
      await changeTrainingStatus(userId)
      toDelete = true
    }
    await training.save()
    res.status(201).json({
      code: 201,
      training: {
        _id: training._id,
        books: training.books,
        pagesRead: training.pagesRead,
        progress: training.progress,
      },
    })
    if (toDelete) {
      training.delete()
    }
  } catch (e) {
    next(e)
  }
}

const getTraining = async (req, res, next) => {
  try {
    const userId = req.user.id
    const training = await findUserTraining(userId)
    if (!training) {
      return res.status(400).json({
        code: 400,
        message: 'Training not found',
      })
    }
    return res.status(200).json({
      code: 200,
      training: {
        _id: training._id,
        startDate: training.startDate,
        finishDate: training.finishDate,
        books: training.books,
        pagesTotal: training.pagesTotal,
        pagesRead: training.pagesRead,
        progress: training.progress,
      },
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  startTraining,
  addTrainingPages,
  getTraining,
}
