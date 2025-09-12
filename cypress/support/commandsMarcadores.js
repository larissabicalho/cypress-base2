import loc from './locators';
import { GerarDados } from '../support/gerarDados';
import { GlobalStaticParameters } from '../support/globalParameters.js';


Cypress.Commands.add("verMarcadores", () => {
    cy.get(loc.MARCADORES.VERMARCADORES).click();
});


Cypress.Commands.add("deletarMarcadores", (nameMarcador) => {
  const dados = {
    name: nameMarcador
  };
  return cy.task("queryFromFile", {
    fileName: "deletarMarcador.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Projeto deletado com sucesso: ${dados.name}`);
  });
});

Cypress.Commands.add("inserirMarcadores", () => {
  const dados = {
    name: GerarDados.nomeMarcador(),
    description: GerarDados.descricaoTexto(),
    date_created: GerarDados.gerarData(),
    date_updated: GerarDados.gerarData(),
  };
  return cy.task("queryFromFile", {
    fileName: "inserirMarcadores.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Marcadores inserida com sucesso: ${dados.name}`);
    return cy.wrap(dados); 
  });
});