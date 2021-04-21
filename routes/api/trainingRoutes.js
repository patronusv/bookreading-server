const express = require('express')
const router = express.Router()
const guard = require('../../utils/guard')
const trainingControllers = require('../../controllers/trainingControllers')

router.post('/', guard, trainingControllers.startTraining)

module.exports = router
