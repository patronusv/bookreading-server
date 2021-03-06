const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

const trainingSchema = new Schema(
  {
    startDate: {
      type: String,
    },

    finishDate: {
      type: String,
    },
    books: [
      {
        bookId: {
          type: SchemaTypes.ObjectId,
          ref: 'book',
        },
        status: {
          type: String,
          enum: ['Reading', 'HaveRead'],
          default: 'Reading',
        },
      },
    ],
    pagesTotal: {
      type: Number,
    },
    endSteps: [{ book: String, pages: Number }],
    pagesRead: {
      type: Number,
      default: 0,
    },
    progress: [{ date: String, pages: Number }],
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
)

const Training = mongoose.model('training', trainingSchema)

module.exports = Training
