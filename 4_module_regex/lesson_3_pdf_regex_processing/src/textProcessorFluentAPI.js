const { evaluateRegex } = require('./util');

const Person = require('./person');

/**
 * The goal of the Fluent API is to perform tasks
 * as a pipeline, step by step, and finally,
 * call the build. Very similar to the BUILDER pattern.
 * The difference is that here it's about PROCESSING, while the Builder is about
 * building objects.
 */
class TextProcessorFluentAPI {
  // private property!
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
     /**
     *  (?<=                  Positive lookbehind assertion, matches if preceded by:
     *  [contratante|contratada]:\s{1}  Literal "contratante" or "contratada" followed by a colon and a space
     *  )                     End of positive lookbehind assertion
     *  (?!\s)                Negative lookahead assertion, matches if not followed by whitespace
     *  (                     Start of capturing group
     *  .*                    Matches any character (except newline) zero or more times
     *  \n                    Matches a newline character
     *  .*?                   Matches any character (except newline) zero or more times, non-greedy
     *  )                     End of capturing group
     *  $                     Asserts position at the end of a line
     *  g                     Global flag, matches all occurrences
     *  m                     Multiline flag, enables ^ and $ to match the start and end of lines
     *  i                     Case insensitive flag, ignores case when matching
     */
    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi);

    /**
     * Matches to find the entire string that contains the data we need.
     */
    const onlyPerson = this.#content.match(matchPerson);
    // console.log('onlyPerson', matchPerson.test(this.#content));
    this.#content = onlyPerson;
    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map(line => line.split(splitRegex));

    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content
      .map(
        line => line.map(item => item.replace(trimSpaces, ''))
      );

    return this;
  }

  mapPerson() {
    /**
     * Passes an array of items to the Person constructor.
     */
    this.#content = this.#content.map(line => new Person(line));
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
