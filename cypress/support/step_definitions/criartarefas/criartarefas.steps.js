import loc from '../../locators';
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import '../../commandsProjeto';
import '../../commandsTarefa';
import { GerarDados } from "../../gerarDados";

Given('que existe um projeto cadastrado no banco', () => {
  cy.inserirProjeto().then((projeto) => {
    cy.log(`Usuário gerado: ${projeto.name}`);
    cy.wrap(projeto).as("projetoValido");
  });
});

Then('acesso a tela de criar tarefas', () => {
  cy.clicarEmVerTarefas().then(() => {
  });
});

Then('preencho o resumo', () => {
  cy.get(loc.TAREFAS.RESUMO).type(GerarDados.sumarioIssue());
});

Then('preencho a descrição', () => {
  cy.get(loc.TAREFAS.DESCRICAO).type(GerarDados.descricaoTexto());
});

Then('confirmo a criação da tarefa', () => {
  cy.get(loc.TAREFAS.CRIARBUTTON).click();
});

Then('a tarefa deve ser criada com sucesso no sistema', () => {
  cy.wait(5000);
  cy.buscarIssue().then((res) => {
    expect(res.length).to.be.greaterThan(0);
    const issue = res[0].id;
    cy.log(`Issue: ${issue}`);
    cy.wrap(issue).as("issueSistema");
  });
});

Then('a tarefa deve existir no banco de dados', () => {
  cy.get('@issueSistema').then((issue) => {
    cy.get(loc.TAREFAS.VERIFICARISSUE)
      .invoke('text')
      .then((texto) => {
        const issueFeita = texto;
        expect(issueFeita).to.include(issue);
      });
  });
});

Then('o projeto e a tarefa devem ser removidos do banco após o teste', () => {
  cy.retornarDadosProjeto().then((res) => {
    expect(res.length).to.be.greaterThan(0);
    const nameProject = res[0].name;
    const idProject = res[0].id;
    cy.log('O texto capturado é: ' + nameProject);
    cy.deletarProjeto(nameProject).then(() => {
      cy.log(`Projeto Deletado: ${nameProject}`);
    });

    cy.deletarIssue(idProject).then(() => {
      cy.log(`Issue Deletada: ${idProject}`);
    });

    cy.deletarTexto().then(() => {
      cy.log(`Texto Deletado`);
    });
  });
  cy.get('@issueSistema').then((issue) => {
    cy.deletarBugHistory(issue).then(() => {
      cy.log(`Bug History Deletado: ${issue}`);
    });
  });
});

Then('adiciono o arquivo', () => {
const isDocker = Cypress.env('DOCKER') === true || Cypress.env('DOCKER') === 'true';
const fileName = 'teste.txt';
if (isDocker) {
 cy.task('copyFromWebdav', {
   source: `/shared_webdav/Upload/${fileName}`,
   target: fileName
 });
   cy.task('log', `Pegou o arquivo ${fileName}`);
}
cy.get('input[type="file"]')
 .attachFile(fileName);
});

Then('o arquivo precisa ser removido', () => {
  cy.deletarAttachment().then(() => {
    cy.log(`File Deletada`);
  });
});
