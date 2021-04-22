const express = require('express')
const router = express.Router()
const guard = require('../../utils/guard')
const { add, get } = require('../../controllers/bookControllers')
const bookRequire= require('../../utils/bookRequire')


router.post('/',bookRequire, guard, add)
router.get('/', guard, get)


module.exports = router