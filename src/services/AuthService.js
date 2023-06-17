const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Boom = require("@hapi/boom")
const UserRepository = require("../repositories/UserRepository.js"); 
const { createToken } = require('../utils/index.js');

const userRepository = new UserRepository()

const registerNewUser = async ({ name, lastname, phone, password }) => {
    try {
        if ( !name ) throw Boom.badRequest('El nombre es obligatorio')
        if ( !lastname ) throw Boom.badRequest('El apellido es obligatorio')
        if ( !phone ) throw Boom.badRequest('El teléfono es obligatorio')
        if ( !password ) throw Boom.badRequest('La contraseña es obligatoria')
        if ( password.length < 6) throw Boom.badRequest('La contraseña debe tener mínimo 6 carácteres')

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const storeIdDefault = 1
        const user = await userRepository.create({ 
            name, 
            lastname, 
            phone, 
            password: hashedPassword, 
            store_id: storeIdDefault,
            active: 1
        })

        // Genera un token JWT
        const token = await createToken({
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
            }
        })

        return { message: 'Registro completado exitosamente.', token }
    } catch ( error ) {
        console.log(error)
        throw error
    }
}

const loginUser = async ({ phone, password }) => {
    try {
        if ( !phone ) { throw Boom.badRequest('El teléfono es obligatorio') }
        if ( !password ) { throw Boom.badRequest('La contraseña es obligatoria') }

        const user = await userRepository.getUserByPhone(phone)
        console.log(user)
        if ( !user ) throw Boom.unauthorized('Credenciales inválidas')

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw Boom.unauthorized('Credenciales inválidas')

        // Genera un token JWT
        const token = await createToken({
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
            }
        })

        return { token }

    } catch ( error ) {
        throw error
    }
}

module.exports = {
    registerNewUser,
    loginUser
}