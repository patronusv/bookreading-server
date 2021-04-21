const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000
const { DB_HOST } = process.env

const bookRouter = require('./routes/api/book')
const authRouter = require('./routes/api/authRoutes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

require('./config/passport')

app.use('/api/auth', authRouter)
app.use('/api/library', bookRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  })
})

mongoose.Promise = global.Promise

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
