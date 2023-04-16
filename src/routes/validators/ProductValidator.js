const { checkSchema } = require('express-validator')

const updateOneProduct = checkSchema({
    name: {
        optional: true,
        isString: true,
        errorMessage: "Name must be a String"
    },
    price: {
        optional: true,
        isDecimal: true,
        errorMessage: "Price must be a Number"
    }
})

module.exports = {
    updateOneProduct
}