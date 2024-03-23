const TextProcessorFluentAPI = require("./textProcessorFluentAPI");

/**
    The Facade design pattern is a structural pattern that aims to
    abstract complex operations of other classes, it is extremely
    used in conjunction with other patterns.
    */
class TextProcessorFacade {
  #textProcessorFluentAPI;

  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build();
  }
}

module.exports = TextProcessorFacade;
