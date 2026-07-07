class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static handle(error) {
    if (error instanceof ApiError) return error;

    if (error.name === 'CastError') {
      return new ApiError(400, `Invalid ${error.path}: ${error.value}`);
    }
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)
        .map((val) => val.message)
        .join(', ');
      return new ApiError(400, message);
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0] || 'Record';
      const formattedField = field.charAt(0).toUpperCase() + field.slice(1);
      return new ApiError(400, `${formattedField} already exists`);
    }
    return new ApiError(500, error.message || 'Internal server error');
  }
}

module.exports = ApiError;
