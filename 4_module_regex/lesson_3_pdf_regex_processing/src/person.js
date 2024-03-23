const { evaluateRegex } = require('./util');

class Person {
  // (\w+):\s.*
  // $1
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado
  ]) {
    const fistLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
    const formatFirstLetter = (prop) => {
      return prop.replace(fistLetterExp, (fullMatch, group1, group2, index) => {
        // console.log(fullMatch, group1, group2, index);
        return `${group1.toUpperCase()}${group2.toLowerCase()}`;
      });
    };

    // (\w+),
    // this.$1 = $1
    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.documento = documento.replace(evaluateRegex(/\D/g), '');
    /**
     * Começa a procurar depois do " a " e pega tudo que tem a frente
     * (?<= faz com que ignore tudo que tiver antes desse match), conhecido
     * como positive lookBehind
     */
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
    this.numero = numero;
    // Começa a buscar depois do espaço, pega qualquer letra ou dígito até o fim da linha;
    // this.bairro = bairro.match(evaluateRegex(/(?<=\s)\w+$/)).join();
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
    this.estado = estado.replace(evaluateRegex(/\.$/), '');
  }
}

module.exports = Person;