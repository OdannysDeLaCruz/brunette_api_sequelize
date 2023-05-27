const { checkSchema } = require('express-validator')

const updateOneCategory = checkSchema({
    name: {
        optional: true,
        isString: true,
        errorMessage: "Name must be a String"
    },
    parent_id: {
        optional: true,
        isDecimal: true,
        errorMessage: "Price must be a Number"
    },
    store_id: {
        optional: true,
        isDecimal: true,
        errorMessage: "Store id must be a Number"
    },
})

module.exports = {
    updateOneCategory
}