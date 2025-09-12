
import loc from './locators';
import { GerarDados } from '../support/gerarDados';

Cypress.Commands.add("queryDb", (query) => {
  return cy.task("queryDb", query);
});

Cypress.Commands.add("queryFromFile", (fileName) => {
  return cy.task("queryFromFile", fileName);
});


Cypress.Commands.add('login', (user, passwd) => {
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.LOGIN.PASSWORD).type(passwd)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
})

Cypress.Commands.add("inserirUsuario", () => {
  const dados = {
    username: GerarDados.nomeUser(),
    realname: GerarDados.fullName(),
    email: GerarDados.email(),
  };

  return cy.task("queryFromFile", {
    fileName: "inserirUsuarioNoBanco.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Usuário inserido com sucesso: ${dados.username}`);
    return cy.wrap(dados); 
  });
});


Cypress.Commands.add("deletarUsuario", (user) => {
  const dados = {
    usuario: user
  };
  return cy.task("queryFromFile", {
    fileName: "deletarUsuarioNoBanco.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Usuário deletado com sucesso: ${dados.usuario}`);
  });
});

Cypress.Commands.add("buscarAdmin", () => {
  return cy.task("queryFromFile", {
    fileName: "buscar_admin.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Usuário retornado: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});

Cypress.Commands.add("buscarUsuario", () => {
  return cy.task("queryFromFile", {
    fileName: "buscarUsuario.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Usuário retornado: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});

Cypress.Commands.add('clicarGerenciar', () => {
    cy.get(loc.GERENCIAR.GERENCIARSISTEMA).click()
});

Cypress.Commands.add('clicarGerenciarUsuario', () => {
    cy.get(loc.USUARIOS.CRIARUSUARIO).click()
});

Cypress.Commands.add("deletarEmail", (email) => {
  const dados = {
    email: email
  };
  return cy.task("queryFromFile", {
    fileName: "deletarEmail.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Email deletado com sucesso: ${dados.email}`);
  });
});