const AuthService = require("../services/AuthService.js")
const { sendSuccessResponse, sendCreatedResponse } = require("../adapters/http/sendResponse.js")

const registerNewUser = async (req, res, next) => {
    try {
        const response = await AuthService.registerNewUser(req.body)
        sendCreatedResponse({res, data: { response }})
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const response = await AuthService.loginUser(req.body)
        sendSuccessResponse({ res, data: response })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerNewUser,
    loginUser
}