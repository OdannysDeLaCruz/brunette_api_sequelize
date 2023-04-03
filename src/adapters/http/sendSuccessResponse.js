const paginate = require('express-paginate')

function sendSuccessResponse({ res, data }) {
    res.status(200).json({
        status: 200,
        results: data,
    });
}

function sendSuccessResponsePaginated({ res, req, data, pagesCount, itemsCount, currentPage }) {
    res.status(200).json({
        status: 200,
        results: data,
        pagesCount,
        itemsCount,
        currentPage,
        pages: paginate.getArrayPages(req)(3, pagesCount, req.query.page)
    })
}

module.exports = { 
    sendSuccessResponse,
    sendSuccessResponsePaginated
}