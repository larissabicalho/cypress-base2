import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalStaticParameters } from '../../globalParameters.js';
import loc from '../../locators';

Given ('acesso Resumo', () => {
    cy.get(loc.RESUMO.CLICORESUMO).click();
});

Then ('devo visualizar os elementos do resumo de tarefas' , () => {
    cy.get(loc.RESUMO.VERIFICARTEXTO, { timeout: 20000 })
      .invoke('text')
      .then((texto) => {
        const resumoTela = texto;
        expect(resumoTela).to.include('Resumo');
      });
});