const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

const trainingSchema = new Schema(
  {
    startDate: {
      type: String,
      required: [true, 'start date is required'],
    },

    finishDate: {
      type: String,
      required: [true, 'finish date is required'],
    },

    books: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'book',
      },
    ],

    progress: [{ date: { type: String }, pageCount: { type: Number } }],

    isComplited: { type: Boolean, default: false },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

const Training = mongoose.model('training', trainingSchema)

module.exports = Training
