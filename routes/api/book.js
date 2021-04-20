const express = require('express')
const router = express.Router()
const {add, get} = require('../../controllers/book')


router.post('/', add)
router.get('/', get)


module.exports = router