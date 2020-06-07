const express = require('express')
const bookRoute = require('../controllers/bookController')
const router = express.Router()

router.get('/', bookRoute.getBooks)
router.get('/:id', bookRoute.getBookByID)
router.post('/', bookRoute.addNewBook)
router.put('/:id', bookRoute.updateBook)
module.exports = router
