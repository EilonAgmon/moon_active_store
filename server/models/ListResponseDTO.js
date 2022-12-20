const BasicDTO = require('./BasicDTO');

class ListResponseDTO extends BasicDTO {
  offers;

  constructor(data) {
    super(data);
    this.offers = data.offers;
  }
}

module.exports = ListResponseDTO;