const { Router } = require('express')
const { check } = require('express-validator')
const { expressValidationResultMiddleware } = require('../middlewares/expressValidationResultMiddleware')
const ProductValidator = require('./validators/ProductValidator')
const ProductController = require('../controllers/ProductController')
const router = Router()

const isNumber = (number) => typeof number === 'number'

router.get('/', ProductController.getAllProducts)
router.get('/:productId', ProductController.getOneProduct)
router.delete('/:productId', ProductController.deleteOneProduct)
router.put('/:productId', 
    ProductValidator.updateOneProduct,
    expressValidationResultMiddleware,
    ProductController.updateOneProduct
)
router.post(
    '/', 
    [
        check('name', 'name is require').isString().withMessage('Name must be a String').not().isEmpty(),
        check('price', 'price is require').custom((_, { req }) => isNumber(req.body.price)).withMessage('Price must be a Number').not().isEmpty(),
        check('original_price', 'original_price is require').custom((_, { req }) => isNumber(req.body.original_price)).withMessage('Original price must be a Number').not().isEmpty(),
        check('description', 'description is require').isString().withMessage('Description must be a String').not().isEmpty(),
        check('brand_id', 'brand_id is require').custom((_, { req }) => isNumber(req.body.brand_id)).withMessage('Brand id must be a Number').not().isEmpty(),
        check('store_id', 'store_id is require').custom((_, { req }) => isNumber(req.body.store_id)).withMessage('Store id must be a Number').not().isEmpty(),
        check('category_id', 'category_id is require').custom((_, { req }) => isNumber(req.body.store_id)).withMessage('Category id must be a Number').not().isEmpty(),
    ],
    expressValidationResultMiddleware,
    ProductController.createOneProduct
)

module.exports = router