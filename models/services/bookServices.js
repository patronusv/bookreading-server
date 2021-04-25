const Book = require('../schemas/book')

const addBook = (userId, body) => {
  return Book.create({ ...body, owner: userId })
}

// Book list by Owner
const getBook = id => {
  return Book.find({ owner: id, isDeleted: false })
}

const findOneBook = ( bookId) => {
  return Book.findOne({_id: bookId})
}

const updateBook = (bookId, body) => {
  return Book.findByIdAndUpdate(bookId, body, { new: true })
}



module.exports = { addBook, getBook, findOneBook, updateBook }
