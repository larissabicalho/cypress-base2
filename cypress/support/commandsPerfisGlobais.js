import loc from './locators';
import { GerarDados } from '../support/gerarDados';
import { GlobalStaticParameters } from '../support/globalParameters.js';

Cypress.Commands.add("verPerfisGlobais", () => {
    cy.get(loc.PERFILGLOBAIS.CLICARPERFILGLOBAL).click();
});

Cypress.Commands.add("deletarPerfisGlobais", (platformName) => {
  const dados = {
    platform : platformName
  };
  return cy.task("queryFromFile", {
    fileName: "deletarPerfisGlobais.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Perfil deletado com sucesso: ${dados.platform}`);
  });
});

Cypress.Commands.add("retornaPerfisGlobais", () => {
  return cy.task("queryFromFile", {
    fileName: "retornaPerfisGlobais.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Buscar Perfis: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});


