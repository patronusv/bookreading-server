const Training = require('../schemas/training')
const { findOneBook } = require('./bookServices')

const createTraining = async (body, pagesTotal, userId) => {
  return await Training.create({ ...body, pagesTotal, owner: userId })
}

const totalPagesCount = async books => {
  let pages = 0
  for (const book of books) {
    const oneBook = await findOneBook(book)
    pages += oneBook.pages
  }
  return pages
}

const findUserTraining = async owner => {
  return await Training.findOne({ owner })
}

module.exports = {
  createTraining,
  totalPagesCount,
  findUserTraining,
}
