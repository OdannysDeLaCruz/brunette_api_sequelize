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
    },
    original_price: {
        optional: true,
        isDecimal: true,
        errorMessage: "Origina price must be a Number"
    },
    description: {
        optional: true,
        isString: true,
        errorMessage: "Description must be a String"
    },
    brand_id: {
        optional: true,
        isDecimal: true,
        errorMessage: "Brand id must be a Number"
    },
    store_id: {
        optional: true,
        isDecimal: true,
        errorMessage: "Store id must be a Number"
    },
})

module.exports = {
    updateOneProduct
}