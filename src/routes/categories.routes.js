const { Router } = require('express')
const { check } = require('express-validator')
const { expressValidationResultMiddleware } = require('../middlewares/expressValidationResultMiddleware')
const { tokenVerify } = require('../middlewares/authMiddleware')
const CategoryValidator = require('./validators/CategoryValidator')
const CategoryController = require('../controllers/CategoryController')
const router = Router()

const isNumber = (number) => typeof number === 'number'

router.use(tokenVerify)

router.get('/', CategoryController.getAllCategories)
router.get('/:categoryId', CategoryController.getOneCategory)
router.get('/:categoryId/products', CategoryController.getAllCategoryProducts)
router.delete('/:categoryId', CategoryController.deleteOneCategory)
router.put('/:categoryId', 
    CategoryValidator.updateOneCategory,
    expressValidationResultMiddleware,
    CategoryController.updateOneCategory
)
router.post(
    '/', 
    [
        check('name', 'name is require').isString().withMessage('Name must be a String').not().isEmpty(),
        check('parent_id', 'parent_id is require').custom((value, { req }) => isNumber(req.body.parent_id)).withMessage('Parent id must be a Number').not().isEmpty(),
        check('store_id', 'store_id is require').custom((value, { req }) => isNumber(req.body.store_id)).withMessage('Store id must be a Number').not().isEmpty(),
    ],
    expressValidationResultMiddleware,
    CategoryController.createOneCategory
)

module.exports = router