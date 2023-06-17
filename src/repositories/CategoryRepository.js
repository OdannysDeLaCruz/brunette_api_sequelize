const { Category, Product } = require("../models/index.js")
const BaseRepository = require("./BaseRepository.js")

class CategoryRepository extends BaseRepository {
    constructor() {
        super(Category)
    }

    async findById(id) {
        try {
            const result = await this.model.findOne({
                where: { id: id },
            })
            return result
        } catch ( error ) {
            throw error
        }
    }
    
    async getAllProducts(id) {
        try {
            const products = await Product.findAll({ where: { category_id: id } })
            return products
        } catch ( error ) {
            throw error
        }
    }
}

module.exports = CategoryRepository