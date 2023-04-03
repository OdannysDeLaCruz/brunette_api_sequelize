const ProductService = require("../services/ProductService.js")
const { sendSuccessResponse, sendSuccessResponsePaginated } = require("../adapters/http/sendSuccessResponse.js")

const getAllProducts = async ( req, res, next ) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const { count, rows } = await ProductService.getAllProducts({ page, limit })
        const pagesCount = Math.ceil(count / limit);

        sendSuccessResponsePaginated({
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

const createOneProduct = async ( req, res ) => {
    try {
        const { name = 'Brunette product', price = 0 } = req.body
        const newProduct = { name, price }

        const productCreated = await ProductService.createOneProduct(newProduct)
        res.status(201).json({
            status: 'OK',
            data: { 
                products: productCreated
            }
        })
    } catch ( error ) {
        res.status(error.status || 500).json({
            status: 'ERROR',
            error: { 
                message: error.message || error
            }
        })
    }
}

const updateOneProduct = async ( req, res ) => {}

const deleteOneProduct = async ( req, res ) => {
    try {
        const { productId } = req.params

        const product = await ProductService.deleteOneProduct(productId)
        res.status(200).json({
            status: 'OK',
            data: { 
                products: product
            }
        })

    } catch ( error ) {
        res.status(error.status || 500).json({
            status: 'ERROR',
            error: { 
                message: error.message || error
            }
        })
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createOneProduct,
    updateOneProduct,
    deleteOneProduct    
}

