class ExpressError extends Error {
    constructor(statusCode, errorMessage) {
        super();
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
}


module.exports = ExpressError;