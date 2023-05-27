const Boom = require("@hapi/boom")
const ProductRepository = require("../repositories/ProductRepository.js") 

const productRepository = new ProductRepository()

/**
 * @description Get all products of database
 * @param {object} object params
 * @param {number} object.page page
 * @param {number} object.limit limit
 * @returns {Array <Product>} ProductList
 */
const getAllProducts = async ({ page, limit = 10 }) => {
    try {
        const { count, rows } = await productRepository.all({ page, limit })
        return { count, rows }
    } catch ( error ) {
        console.log(error)
        if ( error.status === 500) {
            throw Boom.badImplementation()
        } else {
            throw Boom.serverUnavailable('Unavailable')
        }
    }
}

/**
 * @description Get one product by unique id
 * @param {number} id Collection ObjectId
 * @returns {Product} Product
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

        const { name, price, original_price, description, brand_id, store_id, category_id } = newProduct

        const productCreated = await productRepository.create({ name, price, original_price, description, brand_id, store_id, category_id })
        return productCreated
    } catch ( error ) {
        throw error
    }
}

/**
 * @description Delete a product
 * @param {number} id Product Id
 * @returns {Product} productDeleted
 */
const deleteOneProduct = async (id) => {
    try {
        if ( !id ) throw Boom.badRequest('Param id is required')

        const product = await productRepository.findById(id)
        if ( !product ) {
            throw Boom.notFound('Product Not Found')
        }

        // Product Model is paranoic 
        await productRepository.delete(product.id)
        return {
            deleted: true
        }
    } catch ( error ) {
        throw error
    }
} 

/**
 * @description Update a product
 * @param {number} id Product Id
 * @param {object} payload Data to update
 * @returns {Product} productDeleted
 */
const updateOneProduct = async (id, payload) => {
    try {
        const attributes = Object.entries(payload).length
        
        if ( !id ) throw Boom.badRequest('Param id is required')
        const product = await productRepository.findById(id)
        if ( !product ) {
            throw Boom.notFound('Product Not Found')
        }

        if ( !attributes ) throw Boom.badRequest('Payload is required')

        // Validate all attributes types of payload
        
        const updated = product.update(payload)

        return updated
    } catch ( error ) {
        throw error
    }
} 

module.exports = {
    getAllProducts,
    getOneProduct,
    createOneProduct,
    deleteOneProduct,
    updateOneProduct
} 