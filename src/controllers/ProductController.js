const ProductService = require("../services/ProductService.js")
const { sendSuccessResponse, sendSuccessPaginatedResponse, sendCreatedResponse } = require("../adapters/http/sendResponse.js")

const getAllProducts = async ( req, res, next ) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const { count, rows } = await ProductService.getAllProducts({ page, limit })
        const pagesCount = Math.ceil(count / limit);

        sendSuccessPaginatedResponse({
            res,
            req,
            data: { products: rows },
            pagesCount,
            itemsCount: count,
            currentPage: page,
        })

    } catch ( error ) {
        next(error)
    } 
}

const getOneProduct = async ( req, res, next ) => {
    try {
        const { productId } = req.params
        const product = await ProductService.getOneProduct(productId)

        sendSuccessResponse({res, data: { product }})
    } catch ( error ) {
        next(error)
    }
}

const createOneProduct = async ( req, res, next ) => {
    try {
        const { name, price } = req.body
        const newProduct = { name, price }

        const productCreated = await ProductService.createOneProduct(newProduct)
        sendCreatedResponse({res, data: productCreated })
    } catch ( error ) {
        next(error)
    }
}

const updateOneProduct = async ( req, res, next ) => {}

const deleteOneProduct = async ( req, res, next ) => {
    try {
        const { productId } = req.params

        const product = await ProductService.deleteOneProduct(productId)
        sendSuccessResponse({ res, data: product })

    } catch ( error ) {
        next(error)
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createOneProduct,
    updateOneProduct,
    deleteOneProduct    
}

