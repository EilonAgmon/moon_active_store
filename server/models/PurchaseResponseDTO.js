const BasicDTO = require('./BasicDTO');

class PurchaseResponseDTO extends BasicDTO {
  id;
  count;

  constructor(data) {
    super(data);
    this.id = data.id;
    this.count = data.count;
  }
}

module.exports = PurchaseResponseDTO;