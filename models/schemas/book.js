const { Schema, model, SchemaTypes } = require('mongoose')

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
        type: Number,
        default: null
    },
    pages: {
        type: Number,
        require: [true, 'Введіть кількусть сторінок']
    },
    status: {
        type: String,
        enum: ['WillRead', 'Reading', 'HaveRead'],
        default: 'WillRead',
    },
    currentPage: {
        type: Number,
        default: 0,
    },
    review: {
        type: String,
        default: null            
    },
    rating: {
        type: String,
        default: null
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    },
 { versionKey: false, timestamp: true }
)

bookSchema.methods.corrCurrentPage = function (currentPage) {
    if(!this.currentPage){
        this.currentPage > this.page
        return false
    }
    return true
};

const Book = model('book', bookSchema)

module.exports = Book