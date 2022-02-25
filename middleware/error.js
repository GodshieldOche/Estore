const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    const data = err.data
    res.json({
        success: false,
        message: err.message,
        data: data,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export default errorHandler