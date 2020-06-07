const express = require('express')
const bookRoute = require('./bookRoute')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Routing Enabled")
})

router.use('/book', bookRoute)

module.exports = router