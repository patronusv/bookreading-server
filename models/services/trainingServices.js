const Training = require('../schemas/training')
const { findOneBook, updateBook } = require('./bookServices')

const createTraining = async (body, endSteps, userId) => {
  return await Training.create({
    ...body,
    pagesTotal: endSteps[endSteps.length - 1].pages,
    endSteps,
    owner: userId,
  })
}

const totalPagesCount = async books => {
  let pages = 0
  const endSteps = []
  for (const book of books) {
    const oneBook = await findOneBook(book)
    pages += oneBook.pages
    endSteps.push({ book, pages })
  }
  return endSteps
}

const findUserTraining = async owner => {
  return await Training.findOne({ owner })
}

const changeBookStatus = async (books, status) => {
  for (const book of books) {
    await updateBook(book, { status })
  }
}

module.exports = {
  createTraining,
  totalPagesCount,
  findUserTraining,
  changeBookStatus,
}
