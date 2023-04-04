const { Router } = require('express')
const { check } = require('express-validator')
const { expressValidationResultMiddleware } = require('../middlewares/expressValidationResultMiddleware')
const ProductController = require('../controllers/ProductController')
const router = Router()

router.get('/', ProductController.getAllProducts)
router.get('/:productId', ProductController.getOneProduct)
router.delete('/:productId', ProductController.deleteOneProduct)
router.put('/:productId', ProductController.updateOneProduct)
router.post(
    '/', 
    [
        check('name', 'name is require').isString().withMessage('Name must be a String').not().isEmpty(),
        check('price', 'price is require').custom((value, { req }) => Number(req.body.price)).withMessage('Price must be a Number').not().isEmpty(),
        expressValidationResultMiddleware,
    ], 
    ProductController.createOneProduct
)

module.exports = router