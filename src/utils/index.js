const jwt = require('jsonwebtoken')

const isObjectIdValid = ( id ) => {
    if ( id.match(/^[0-9a-fA-F]{24}$/) ) {
        return true
    }
    return false
}

const createToken = async (data, config = { expiresIn: '24h' }) => {
    const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, config)
    return token
}

const decodeToken = async (token) => {
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    return payload
}

module.exports = {
    isObjectIdValid,
    createToken,
    decodeToken
}