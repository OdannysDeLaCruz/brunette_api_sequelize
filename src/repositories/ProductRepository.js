const { Product, ProductCategories } = require("../models/index.js")
const BaseRepository = require("./BaseRepository.js")

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product)

    }

    async all({ page, limit }) {
        try {
            const offset = (page - 1) * limit;
            const { count, rows } = await this.model.findAndCountAll({
                limit,
                offset,
                include: 'Category'
            })
            
            return { count, rows }

        } catch ( error ) {
            throw error
        }
    }

    async create(dataItem) {
        try {
            const newDataItem = await this.model.create(dataItem)
            
            await ProductCategories.create({
                product_id: newDataItem.id,
                category_id: dataItem.category_id,
            })

            return newDataItem
        } catch ( error ) {
            throw error
        }
    }

    async findById(id) {
        try {
            const result = await this.model.findOne({
                where: { id: id },
                include: 'Category'
            })
            return result
        } catch ( error ) {
            throw error
        }
    }
}

module.exports = ProductRepository