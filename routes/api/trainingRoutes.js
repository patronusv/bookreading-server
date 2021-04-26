const express = require('express')
const router = express.Router()
const guard = require('../../utils/guard')
const trainingControllers = require('../../controllers/trainingControllers')
const { trainingRequire } = require('../../utils/trainingRequire')
const {
  addTrainingPagesRequire,
} = require('../../utils/addTrainingPagesRequire')

router.post('/', guard, trainingRequire, trainingControllers.startTraining)
router.patch(
  '/',
  guard,
  addTrainingPagesRequire,
  trainingControllers.addTrainingPages
)

module.exports = router
