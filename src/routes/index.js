const { Router } = require('express')
const router = Router()
const authRoutes = require('./auth.routes')
const productsRoutes = require('./products.routes')
const categoriesRoutes = require('./categories.routes')

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/products', productsRoutes)
router.use('/api/v1/categories', categoriesRoutes)

module.exports = router