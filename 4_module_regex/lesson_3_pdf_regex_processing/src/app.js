'use strict';

const { readFile } = require('fs/promises');
const { join } = require('path'); // normalizar o path
const pdf = require('pdf-parse');

const TextProcessorFacade = require('./textProcessorFacade');

//
;(async () => {
  const pdfBuffer = await readFile(join(__dirname, '../docs/contrato.pdf'));
  console.log('pdfBuffer =>', pdfBuffer);
  const dataPdf = await pdf(pdfBuffer);
  console.log(dataPdf.text);

  const textProcessorFacade = new TextProcessorFacade(dataPdf.text);
  const people = textProcessorFacade.getPeopleFromPDF();
  console.log('people', people);
})();
