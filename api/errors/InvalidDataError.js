class InvalidDataError extends Error {
    constructor(message) {
        super(message)

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name

        this.status = 422

        this.isClientError = true
    }

    statusCode() {
        return this.status
    }
}

module.exports = InvalidDataError