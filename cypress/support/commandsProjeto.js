import loc from './locators';
import { GerarDados } from '../support/gerarDados';
import { GlobalStaticParameters } from '../support/globalParameters.js';


Cypress.Commands.add("inserirProjeto", () => {
  const dados = {
    name: GerarDados.nomeProjeto(),
    file_path: GlobalStaticParameters.file_path,
    description: GlobalStaticParameters.description,
  };

return cy.task("queryFromFile", {
    fileName: "inserirProjetoNoBanco.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Projeto inserido com sucesso: ${dados.name}`);
    return cy.wrap(dados); 
  });
});

Cypress.Commands.add("buscarIssue", () => {
  return cy.task("queryFromFile", {
    fileName: "retornarDadosIssue.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Issue Retornada: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});

Cypress.Commands.add("deletarProjeto", (nameProject) => {
  const dados = {
    name: nameProject
  };
  return cy.task("queryFromFile", {
    fileName: "deletarProjeto.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Projeto deletado com sucesso: ${dados.name}`);
  });
});

Cypress.Commands.add("retornarDadosProjeto", () => {
  return cy.task("queryFromFile", {
    fileName: "retornarDadosProjeto.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Projeto Retornado: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});

Cypress.Commands.add("verProjetos", () => {
   cy.get(loc.PROJETOS.PROJETO).click();
});

Cypress.Commands.add("deletarCategoria", (nameCategoria) => {
  const dados = {
    name: nameCategoria
  };
  return cy.task("queryFromFile", {
    fileName: "deletarCategoria.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Categoria deletada com sucesso: ${dados.name}`);
  });
});

Cypress.Commands.add("inserirCategoria", () => {
  const dados = {
    name: GerarDados.categoriaName(),
  };
return cy.task("queryFromFile", {
    fileName: "inserirCategoria.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Categoria inserida com sucesso: ${dados.name}`);
    return cy.wrap(dados); 
  });
});

Cypress.Commands.add("retornaCategoria", () => {
  return cy.task("queryFromFile", {
    fileName: "retornaCategoria.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Categoria Retornada: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});
