class APIResponse {
  constructor(status, message = 'Success', data = null, meta = null) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }

  send(res) {
    const response = {
      status: this.status,
      message: this.message,
      data: this.data,
    };

    // Include meta only when provided
    if (this.meta) {
      response.meta = this.meta;
    }

    return res.status(this.status).json(response);
  }
}

module.exports = APIResponse;
