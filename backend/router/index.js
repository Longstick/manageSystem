const express = require('express')
const router = express.Router()

router.use("/manage",require('./manage'))

router.use("/equip",require('./equip'))

router.use("/book",require('./book'))


router.use("/resources",require('./resources'))

module.exports = router