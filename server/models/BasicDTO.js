class BasicDTO {
  success;
  message;

  constructor(data) {
    this.success = data.success;
    this.message = data.message;
  }
}

module.exports = BasicDTO;