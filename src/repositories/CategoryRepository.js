const { Category, Product, ProductCategories } = require("../models/index.js")
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
            // const result = await this.model.findOne({
            //     where: { id },
            //     include: [Product],
            // })

            const result = await this.model.findOne({
                where: { id },
                include: {
                  model: Product,
                  through: {
                    attributes: []
                  }
                }
              });

            console.log(result)
            return result
        } catch ( error ) {
            throw error
        }
    }
}

module.exports = CategoryRepository