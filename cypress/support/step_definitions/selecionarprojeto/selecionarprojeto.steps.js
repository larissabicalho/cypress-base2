import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalStaticParameters } from '../../globalParameters.js';
import loc from '../../locators';

Then('clico em todos projetos', () => {
    cy.get(loc.SELECIONARPROJETO.CLICARTODOSPROJETOS).click();
});

Then('seleciono o projeto', () => {
    cy.retornarDadosProjeto().then((res) => {
        expect(res.length).to.be.greaterThan(0);
        const idProject = res[0].id;
        cy.get('a[href="/set_project.php?project_id=' + idProject + '"]').click();
    });
});

Then('o projeto deve estar selecionado', () => {
    cy.retornarDadosProjeto().then((res) => {
        expect(res.length).to.be.greaterThan(0);
        const nameProject = res[0].name;
        cy.get('#dropdown_projects_menu > .dropdown-toggle', { timeout: 20000 })
            .invoke('text')
            .then((texto) => {
                const resumoTela = texto;
                expect(resumoTela).to.include(nameProject);
            });
    });
})

Then('o projeto deve ser removido do banco após o teste', () => {
    cy.retornarDadosProjeto().then((res) => {
        expect(res.length).to.be.greaterThan(0);
        const nameProject = res[0].name;
        cy.log('O texto capturado é: ' + nameProject);
        cy.deletarProjeto(nameProject).then(() => {
            cy.log(`Projeto Deletado: ${nameProject}`);
        });
    });
});