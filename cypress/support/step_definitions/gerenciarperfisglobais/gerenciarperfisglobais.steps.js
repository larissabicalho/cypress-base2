import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import '../../commandsPerfisGlobais';
import { GerarDados } from '../../gerarDados';
import loc from '../../locators';

Then('clico em gerenciar perfil global', () => {
    cy.verPerfisGlobais();
});

Then('preencho o campo plataforma', () => {
    const campoPlataforma = GerarDados.nomePlataforma();
    cy.wrap(campoPlataforma).as("campoPlataformaValido");
    cy.get(loc.PERFILGLOBAIS.PLATAFORM).type(campoPlataforma);
});

Then('preencho o campo SO', () => {
    const so = GerarDados.nomeSO();
    cy.wrap(so).as("soValido");
    cy.get(loc.PERFILGLOBAIS.SO).type(so);
});

Then('preencho o campo versão SO', () => {
    const versaoSO = GerarDados.nomeVersaoSO();
    cy.wrap(versaoSO).as("versaoSOValido");
    cy.get(loc.PERFILGLOBAIS.VERSAOSO).type(versaoSO);
});

Then('preencho o campo descrição da plataforma', () => {
    const descricaoSO = GerarDados.descricaoTexto();
    cy.get(loc.PERFILGLOBAIS.DESCRICAO).type(descricaoSO);
});

Then('clico em criar perfil global', () => {
    cy.get(loc.PERFILGLOBAIS.ADICIONARPERFISGLOBAIS).first().click();
});

Then('o perfil global deve ser criado com sucesso', () => {
    cy.get('@campoPlataformaValido').then((plataforma) => {
        cy.get('@soValido').then((so) => {
            cy.get('@versaoSOValido').then((versaoSO) => {
                const valorEsperado = `${plataforma} ${so} ${versaoSO}`;
                cy.log('PLATAFORMA: ' + valorEsperado);

                cy.get(loc.PERFILGLOBAIS.SELECTPLATAFORM)
                    .select(valorEsperado)
                    .find('option:selected')               // pega a opção selecionada
                    .should('have.text', valorEsperado);   // valida pelo texto visível
            });
        });
    });
});



Then('devo tirar o perfil global do banco', () => {
    cy.get('@campoPlataformaValido').then((plataforma) => {
        cy.deletarPerfisGlobais(plataforma);
    });
});

Then('acontece um erro', () => {
    cy.get('#os').then(($input) => {
        expect($input[0].checkValidity()).to.be.false;
        expect($input[0].validationMessage).to.eq('Preencha este campo.');
    });
});