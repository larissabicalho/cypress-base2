import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { GerarDados } from '../../gerarDados';
import loc from '../../locators';
import {GlobalStaticParameters} from '../../globalParameters';

Then('que gerenciamento de usuarios', () => {
    cy.clicarGerenciarUsuario();
});

Then('clico em nova conta', () => {
    cy.get(loc.USUARIOS.CLICARCONTA).click();
});

Then('preencho o nome do usuario', () => {
    const nome = GerarDados.nomeUser();
    cy.get(loc.USUARIOS.PREENCHERNOME).type(nome);
});

Then('preencho o nome verdadeiro', () => {
    const nome = GerarDados.fullName();
    cy.get(loc.USUARIOS.PREENCHERREALNAME).type(nome);
});

Then('preencho o email', () => {
    const email = GerarDados.email();
    cy.get(loc.USUARIOS.PREENCHEREMAIL).type(email);
});

Then('clico em criar usuario', () => {
    cy.get(loc.USUARIOS.BUTTONCRIAR).click();
});

Then('o usuário deve ser cadastrado com sucesso no banco de dados', () => {
    cy.buscarAdmin().then((user) => {
        cy.wrap(user).as("userValido");
    });
    cy.get('@userValido').then((user) => {
        cy.get('[href="manage_user_edit_page.php?user_id=' + user[0].id + '"]').should('exist');
    });
});

Then('o usuário e email deve ser removido do banco após o teste', () => {
    cy.get('@userValido').then((user) => {
        cy.deletarUsuario(user[0].username);
        cy.deletarEmail(user[0].email);
    });
});

Then ('mensagem e exibida de erro', () => {
 cy.get(loc.USUARIOS.MESSAGEERROR, { timeout: 20000 })
      .invoke('text')
      .then((texto) => {
        const notaTexto = texto;
        expect(notaTexto).to.include(GlobalStaticParameters.mensagemErroUsuario);
      });
  });