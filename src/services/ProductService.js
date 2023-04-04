const Boom = require("@hapi/boom")
const ProductRepository = require("../repositories/ProductRepository.js") 

const productRepository = new ProductRepository()

/**
 * @description Get all products of database
 * @returns {array} Objects array
 */
const getAllProducts = async ({ page, limit = 10 }) => {
    try {
        const { count, rows } = await productRepository.all({ page, limit })
        return { count, rows }
    } catch ( error ) {
        if ( error.status === 500) {
            throw Boom.badImplementation()
        } else {
            throw Boom.serverUnavailable('Unavailable')
        }
    }
}

/**
 * @description Get one product by unique id
 * @param {string} id Collection ObjectId
 * @returns {array <product>} Array with one product object
 */
const getOneProduct = async (id) => {
    try {
        id = Number(id)
        if ( !id ) {
            throw Boom.badRequest('Param id is required')
        }

        const product = await productRepository.findById(id)
        if (product === null) {
            throw Boom.notFound('Product not found')
        }

        return product
    } catch ( error ) {
        throw error
    }
}

/**
 * @description Create a new product
 * @param {object} newProduct 
 * @param {string} newProduct.name
 * @param {number} newProduct.price
 * @returns {object} productCreated
 */
const createOneProduct = async (newProduct) => {
    try {
        if ( !newProduct ) {
            throw Boom.badRequest('No valid object provided')
        }

        // TODO: verify all fields required

        const productCreated = await productRepository.create(newProduct)
        return productCreated
    } catch ( error ) {
        throw error
    }
}

const deleteOneProduct = async (id) => {
    try {
        if ( !id ) {
            throw Boom.badRequest('Param id is required')
        }

        const product = await productRepository.findById(id)
        if ( !product ) {
            throw Boom.notFound('Product Not Found')
        }

        // Product Model is paranoic 
        const productDeleted = await productRepository.delete(product.id)
        return productDeleted
    } catch ( error ) {
        throw error
    }
} 

module.exports = {
    getAllProducts,
    getOneProduct,
    createOneProduct,
    deleteOneProduct
} 