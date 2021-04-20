const { Schema, model } = require('mongoose')

const bookSchema = new Schema (
    {title: {
        type: String,
        require: [true, 'Введіть назву книги'],
    },
    author: {
        type: String,
        default: 'Unknown author'
    },
    year: {
        type: String,
        default: 'Unknown year'
    },
    pages: {
        type: String,
        require: [true, 'Введіть кількусть сторінок']
    },
    status: {
        type: String,
        enum: ['WillRead', 'Reading', 'HaveRead'],
        default: 'WillRead',
    },
    currentPage: {
        type: String,
        default: '0'
    },
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: 'user'
    // }
},
 { versionKey: false, timestamp: true }
)

const Book = model('book', bookSchema)

module.exports = Book