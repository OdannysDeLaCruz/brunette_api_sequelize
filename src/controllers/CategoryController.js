const CategoryService = require("../services/CategoryService.js")
const { sendSuccessResponse, sendSuccessPaginatedResponse, sendCreatedResponse } = require("../adapters/http/sendResponse.js")

const getAllCategories = async ( req, res, next ) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const { count, rows } = await CategoryService.getAllCategories({ page, limit })
        const pagesCount = Math.ceil(count / limit);

        sendSuccessPaginatedResponse({
            res,
            req,
            data: { categories: rows },
            pagesCount,
            itemsCount: count,
            currentPage: page,
        })

    } catch ( error ) {
        next(error)
    } 
}

const getOneCategory = async ( req, res, next ) => {
    try {
        const { categoryId } = req.params
        const category = await CategoryService.getOneCategory(categoryId)

        sendSuccessResponse({res, data: { category }})
    } catch ( error ) {
        next(error)
    }
}

const getAllCategoryProducts = async ( req, res, next ) => {
    try {
        const { categoryId } = req.params
        const response = await CategoryService.getAllCategoryProducts(categoryId)

        sendSuccessResponse({res, data: response})
    } catch ( error ) {
        next(error)
    }
}

const createOneCategory = async ( req, res, next ) => {
    try {
        const category = req.body

        const categoryCreated = await CategoryService.createOneCategory(category)
        sendCreatedResponse({res, data: categoryCreated })
    } catch ( error ) {
        next(error)
    }
}

const updateOneCategory = async ( req, res, next ) => {
    try {
        const { categoryId } = req.params
        const updated = await CategoryService.updateOneCategory(categoryId, req.body)
        sendSuccessResponse({ res, data: {
            updated: updated,
            message: 'Category updated'
        } })
     } catch (error) {
        next(error)
    }
}

const deleteOneCategory = async ( req, res, next ) => {
    try {
        const { categoryId } = req.params

        const category = await CategoryService.deleteOneCategory(categoryId)
        sendSuccessResponse({ res, data: category })

    } catch ( error ) {
        next(error)
    }
}

module.exports = {
    getAllCategories,
    getOneCategory,
    getAllCategoryProducts,
    createOneCategory,
    updateOneCategory,
    deleteOneCategory    
}

