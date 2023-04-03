function sendResponse({res, status, results, currentPage, totalPages}) {
    res.status(status).json({
        status,
        results,
        pagination: {
            currentPage,
            totalPages
        }
    });
}

module.exports = sendResponse