const { Router } = require('express')
const router = Router()
const productsRoutes = require('./products.routes')

router.use('/api/v1/products', productsRoutes)

module.exports = router