import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalStaticParameters } from '../../globalParameters.js';

Given("que estou na tela de login", () => {
  cy.visit("/");
});

Given("que eu acesso ao banco", () => {
  cy.inserirUsuario().then((usuario) => {
    cy.log(`Usuário gerado: ${usuario.username}`);
    cy.wrap(usuario).as("usuarioValido");
  });
});

When("informo o usuario valido", () => {
  cy.get("@usuarioValido").then((usuario) => {
    cy.get("#username").type(usuario.username);
  });
});

Then("informo a senha correta", () => {
  cy.fixture("users").then((usersJson) => {
    const firstUsername = Object.keys(usersJson)[0];
    const password = usersJson[firstUsername].passwordUser;
    cy.get("#password").type(password);
  });
});

Then("clico no botao login", () => {
  cy.get(".width-40").click();
});

Then("devo ser autenticado com sucesso", () => {
  cy.get("@usuarioValido").then((usuario) => {
    cy.get('.user-info').should('contain', usuario.username);
  });

});

Then("deleto o usuario criado e email", () => {
    cy.buscarAdmin().then((res) => {
    const usuario = res[0].username;
    const email = res[0].email;
    cy.deletarUsuario(usuario);
    cy.deletarEmail(email);
    });
});


When("eu preencho o usuário incorreto", () => {
  const userErrado = GlobalStaticParameters.user;
  cy.get("#username").type(userErrado);
});

Then("devo ver a mensagem de erro de email", () => {
  cy.get('.alert-danger > p')
    .should("be.visible")
    .and("have.text", GlobalStaticParameters.mensagemErroEmail);
});

Given("que existe um usuário cadastrado no sistema", () => {
  cy.buscarAdmin().then((res) => {
    expect(res.length).to.be.greaterThan(0);

    const usuario = res[0].username;
    expect(usuario).to.be.a("string").and.not.be.empty;

    cy.log(`Login do admin: ${usuario}`);
    cy.wrap(usuario).as("usuarioSistema");
  });
});

When("eu preencho o campo usuário com um login válido", () => {
  cy.get("@usuarioSistema").then((usuario) => {
    cy.get("#username").type(usuario);
  });
});

Then("eu preencho o campo senha com uma senha inválida", () => {
  cy.get("#password").type(GlobalStaticParameters.senha);
});

When("ele não preenche o campo de email", () => {
  cy.get("#username").focus().blur();
});

Then("não preenche a senha", () => {
  cy.get("#password").focus().blur();
});

When("eu preencho o campo usuário com um valor contendo caractere especial", () => {
  cy.get("#username").type(GlobalStaticParameters.userComCaracterEspecial);
});

Then("logo no sistema", () => {
  cy.buscarAdmin().then((res) => {
    expect(res.length).to.be.greaterThan(0);
    const usuario = res[0].username;
    cy.fixture("users").then((usersJson) => {
      const firstUsername = Object.keys(usersJson)[0];
      const password = usersJson[firstUsername].passwordUser;
      cy.log('login')
      cy.login(usuario, password);
    });
  });
});

Then("logo no sistema admin", () => {
  cy.buscarAdmin().then((res) => {
    expect(res.length).to.be.greaterThan(0);
    const usuario = res[0].username;
    cy.fixture("users").then((usersJson) => {
      const firstUsername = Object.keys(usersJson)[0];
      const password = usersJson[firstUsername].password;
      cy.log('login')
      cy.login(usuario, password);
    });
  });
});

Then("busco usuario novo", () => {
  cy.buscarAdmin().then((res) => {
    cy.wrap(res[0]).as("usuarioNovo");
  });
});
