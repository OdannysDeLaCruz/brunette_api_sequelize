const { User } = require("../models/index.js")
const BaseRepository = require("./BaseRepository.js")

class UserRepository extends BaseRepository {
    constructor() {
        super(User)
    }

    async getUserByPhone(phone) {
        try {
            const user = await this.model.findOne({ where: { phone } })
            return user
        } catch ( error ) {
            throw error
        }
    }
}

module.exports = UserRepository