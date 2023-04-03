const { Product } = require("../models/index.js")
const BaseRepository = require("./BaseRepository.js")

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product)
    }
}

module.exports = ProductRepository