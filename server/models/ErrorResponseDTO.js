const BasicDTO = require('./BasicDTO');

class ErrorResponseDTO extends BasicDTO {
  errorCode;

  constructor(data) {
    super(data);
    this.success = false;
    this.errorCode = data.errorCode;
  }
}

module.exports = ErrorResponseDTO;