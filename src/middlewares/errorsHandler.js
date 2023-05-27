const errorLogger = (error, res, req, next) => {
    console.log(`Ha ocurrido un error: ${error.message}`)

    next(error)
}

const errorResponder = (error, req, res, next) => {
    console.log(error)
    if ( error.isBoom ) {
        const { output } = error
        res.status(output.statusCode).json(output.payload)
    } else {
        if ( process.env.NODE_ENV === 'production' ) {
            res.status(500).json({
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'An internal server error occurred'
            })
        } else {
            res.status(500).json({
                statusCode: 500,
                error: error,
                message: error.message,
                stack: error.stack
            })
        }
    }
}

module.exports = {
    errorLogger,
    errorResponder
}