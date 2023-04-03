const { Router } = require('express')
const { check } = require('express-validator')
const { expressValidationResultMiddleware } = require('../middlewares/expressValidationResultMiddleware')
const ProductController = require('../controllers/ProductController')
const router = Router()

router.get('/', ProductController.getAllProducts)
router.get('/:productId', ProductController.getOneProduct)
router.post(
    '/', 
    [
        check('name', 'name is require').not().isEmpty(),
        check('price', 'price is require').not().isEmpty(),
        expressValidationResultMiddleware,
    ], 
    ProductController.createOneProduct
)

module.exports = router