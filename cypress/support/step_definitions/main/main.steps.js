import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalStaticParameters } from '../../globalParameters.js';
import loc from '../../locators';

Then('existe uma tarefa atribuída a mim no sistema', () => {
    cy.get('@projetoValor').then((projeto) => {
        cy.get('@idTextoSistema').then((texto) => {
            cy.log(`Projeto: ${projeto.id} - ${projeto.name}`);
            cy.inserirIssueHandler(projeto.id, texto.id).then(() => {
                cy.log(`Issue gerada`);
            });
        });
    });
    cy.retornaDadosIssue().then((res) => {
        cy.wrap(res[0]).as("idIssueSistemaHandler");
    });
});

Then('clico em Atribuídas a mim', () => {
    cy.get(loc.MAIN.ATRIBUIDOS).click();
});

Then('clico em Não atribuídas', () => {
    cy.get(loc.MAIN.NAOATRIBUIDOS).click();
});

Then('clico em Resolvidas por mim', () => {
    cy.get(loc.MAIN.RESOLVIDOS).click();
});


Then('clico em Relatadas por mim', () => {
    cy.get(loc.MAIN.RELATADAS).click();
});

Then('clico em Monitoradas por mim', () => {
    cy.get(loc.MAIN.MONITORADOS).click();
});

Then('clico em Modificadas Recentemente', () => {
    cy.get(loc.MAIN.RECENTES).click();
});

Then('a tarefa deve ser exibida na lista', () => {
    cy.get('@idIssueSistema').then((issue) => {
        cy.get('[href="/view.php?id=' + issue.id + '"]', { timeout: 20000 })
            .should('exist');
    });
});

Then('a tarefa atribuída deve ser exibida na lista', () => {
    cy.get('@idIssueSistemaHandler').then((issue) => {
        cy.get('[href="/view.php?id=' + issue.id + '"]', { timeout: 20000 })
            .should('exist');
    });
});

Then('a tarefa resolvida deve ser exibida na lista', () => {
    cy.get('@idIssueSistemaResolvido').then((issue) => {
        cy.get('[href="/view.php?id=' + issue.id + '"]', { timeout: 20000 })
            .should('exist');
    });
});

Then('o projeto texto e issue handler devem ser removidos do banco após o teste', () => {
    cy.get('@projetoValor').then((projeto) => {
        cy.deletarProjeto(projeto.name).then(() => {
            cy.log(`Projeto Deletado`);
        });
        // nova
        cy.deletarIssue(projeto.id).then(() => {
            cy.log(`Issue Deletada`);
        });

        cy.deletarTexto().then(() => {
            cy.log(`Texto Deletado`);
        });

    });
    cy.get('@idIssueSistemaHandler').then((issue) => {
        cy.deletarBugHistory(issue.id).then(() => {
            cy.log(`Bug History Deletado`);
        });
    });
});

 When ('eu clico na conta' , () => {
    cy.get(loc.LOGOUT.CLICARCONTA).click();
 });

Then('clico para sair da conta', () => {
  cy.get(loc.LOGOUT.SAIR).click();
});

 Then('devo visualizar o campo de login novamente', () =>{
    cy.get(loc.LOGIN.USER).should('exist');
 });