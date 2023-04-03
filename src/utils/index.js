const isObjectIdValid = ( id ) => {
    if ( id.match(/^[0-9a-fA-F]{24}$/) ) {
        return true
    }
    return false
}

module.exports = {
    isObjectIdValid
}