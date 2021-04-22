const Book = require('../schemas/book')

const addBook = (userId, body) => {
  return Book.create({ ...body, owner: userId })
}

const getBook = id => {
  return Book.find({ owner: id })
}

module.exports = { addBook, getBook }
