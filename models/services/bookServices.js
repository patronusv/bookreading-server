const Book = require('../schemas/book')

const addBook = (userId, body) => {
    return Book.create({...body, owner: userId})
}

const getBook = () => {
    return Book.find()
}
module.exports = {addBook, getBook}
