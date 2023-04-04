class BaseRepository {
    constructor(model) {
        this.model = model
    }

    async all({ page, limit }) {
        try {
            const offset = (page - 1) * limit;
            const { count, rows } = await this.model.findAndCountAll({
                limit,
                offset
            })
            
            return { count, rows }

        } catch ( error ) {
            throw error
        }
    }

    async findById(id) {
        try {
            const result = await this.model.findByPk(id)
            return result
        } catch ( error ) {
            throw error
        }
    }

    async create(dataItem) {
        try {
            const newDataItem = await this.model.create(dataItem)
            return newDataItem
        } catch ( error ) {
            throw error
        }
    }
    
    async update(id) {
        throw new Error('Method not implemented.')
    }

    async delete(id) {
        try {
            const result = await this.model.destroy({
                where: { id: id }
            })
            return result
        } catch ( error ) {
            throw error
        }
    }
}

module.exports = BaseRepository