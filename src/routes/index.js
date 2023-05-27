const { Router } = require('express')
const router = Router()
const productsRoutes = require('./products.routes')
const categoriesRoutes = require('./categories.routes')

router.use('/api/v1/products', productsRoutes)
router.use('/api/v1/categories', categoriesRoutes)

module.exports = router