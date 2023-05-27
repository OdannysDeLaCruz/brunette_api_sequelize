const Boom = require("@hapi/boom")
const CategoryRepository = require("../repositories/CategoryRepository.js") 

const categoryRepository = new CategoryRepository()

/**
 * @description Get all categories of database
 * @param {object} object params
 * @param {number} object.page page
 * @param {number} object.limit limit
 * @returns {Array <Category>} CategoryList
 */
const getAllCategories = async ({ page, limit = 10 }) => {
    try {
        const { count, rows } = await categoryRepository.all({ page, limit })
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
 * @description Get one category by unique id
 * @param {number} id Collection ObjectId
 * @returns {Category} Category
 */
const getOneCategory = async (id) => {
    try {
        id = Number(id)
        if ( !id ) {
            throw Boom.badRequest('Param id is required')
        }

        const category = await categoryRepository.findById(id)
        if (category === null) {
            throw Boom.notFound('Category not found')
        }

        return category
    } catch ( error ) {
        throw error
    }
}

/**
 * @description Get all products of a category by unique id
 * @param {number} id Collection ObjectId
 * @returns {CategoryProducts} Category products
 */
const getAllCategoryProducts = async (categoryId) => {
    try {
        categoryId = Number(categoryId)
        if ( !categoryId ) {
            throw Boom.badRequest('Param categoryId is required')
        }

        const category = await getOneCategory(categoryId)

        const categoryProducts = await categoryRepository.getAllProducts(categoryId)
        if (categoryProducts === null) {
            throw Boom.notFound('Products not found')
        }

        const response = {
            // category,
            products: categoryProducts
        }

        return response
    } catch ( error ) {
        throw error
    }
}

/**
 * @description Create a new category
 * @param {object} newCategory 
 * @param {string} newCategory.name
 * @param {number} newCategory.price
 * @returns {object} categoryCreated
 */
const createOneCategory = async (newCategory) => {
    try {
        if ( !newCategory ) {
            throw Boom.badRequest('No valid object provided')
        }

        const { name, parent_id, store_id } = newCategory

        const categoryCreated = await categoryRepository.create({ name, parent_id, store_id })
        return categoryCreated
    } catch ( error ) {
        if ( error.name === 'SequelizeForeignKeyConstraintError' ) {
            throw Boom.badRequest(error.parent.sqlMessage)
        }

        throw error
    }
}

/**
 * @description Delete a category
 * @param {number} id Category Id
 * @returns {Category} categoryDeleted
 */
const deleteOneCategory = async (id) => {
    try {
        if ( !id ) throw Boom.badRequest('Param id is required')

        const category = await categoryRepository.findById(id)
        if ( !category ) {
            throw Boom.notFound('Category Not Found')
        }

        // Category Model is paranoic 
        await categoryRepository.delete(category.id)
        return {
            deleted: true
        }
    } catch ( error ) {
        throw error
    }
} 

/**
 * @description Update a category
 * @param {number} id Category Id
 * @param {object} payload Data to update
 * @returns {Category} categoryDeleted
 */
const updateOneCategory = async (id, payload) => {
    try {
        const attributes = Object.entries(payload).length
        
        if ( !id ) throw Boom.badRequest('Param id is required')
        const category = await categoryRepository.findById(id)
        if ( !category ) {
            throw Boom.notFound('Category Not Found')
        }

        if ( !attributes ) throw Boom.badRequest('Payload is required')

        // Validate all attributes types of payload
        
        const updated = category.update(payload)

        return updated
    } catch ( error ) {
        throw error
    }
} 

module.exports = {
    getAllCategories,
    getOneCategory,
    getAllCategoryProducts,
    createOneCategory,
    deleteOneCategory,
    updateOneCategory
} 