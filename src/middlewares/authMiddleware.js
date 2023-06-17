const Boom = require("@hapi/boom")
const { decodeToken } = require('../utils')

const tokenVerify = async (req, res, next) => {
    const token = req.headers.token
    if (!token) throw Boom.unauthorized('Token de autenticación no proporcionado')

    try {
        const decoded = await decodeToken(token)
        // const decoded = jwt.verify(token, 'jwt_secret_key');
        // const decoded2 = jwt.decode(token, 'jwt_secret_key');
        console.log(decoded)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        throw Boom.unauthorized('Token de autenticación inválido')
    }
}

module.exports =  { tokenVerify }