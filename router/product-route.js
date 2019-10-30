const express = require('express')
const router = express.Router()

const controller = require('../controllers/product-controller')
// const authMiddleware = require('../middleware/auth-middleware')

router.get('/', controller.index)
router.get('/search', controller.search)

module.exports = router
