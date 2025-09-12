import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalStaticParameters } from '../../globalParameters.js';
import loc from '../../locators';
import '../../commandsProjeto';

When('eu criar um projeto com nome {string}', (nomeProjeto) => {
    cy.get(loc.PROJETOS.NOMEPROJETO).type(nomeProjeto);
});

Then('o projeto {string} deve estar cadastrado corretamente', (nomeProjeto) => {
    cy.wait(4000);
    cy.get('a').contains(nomeProjeto);
});

Then('deleto o projeto {string}', (nomeProjeto) => {
    cy.deletarProjeto(nomeProjeto).then(() => {
        cy.log(`Projeto Deletado: ${nomeProjeto}`);
    });
});

When('eu criar um marcador com nome {string} e a descricao {string}', (nomeMarcador, descricaoMarcador) => {
    cy.get(loc.MARCADORES.NOMEMARCADORES).type(nomeMarcador);
    cy.get(loc.MARCADORES.DESCRICAOMARCADORES).type(descricaoMarcador);
});

Then('deleto o marcador {string} do data driven' , (nomeMarcadores) => {
    cy.deletarMarcadores(nomeMarcadores).then(() => {
        cy.log(`Deletar Marcador: ${nomeMarcadores}`);
    });
});

 When('preencho o nome {string} e preencho nome verdadeiro {string} e o email {string}', (nome, nomeVerdadeiro, email) =>{
    cy.get(loc.USUARIOS.PREENCHERNOME).type(nome);
    cy.get(loc.USUARIOS.PREENCHERREALNAME).type(nomeVerdadeiro);
    cy.get(loc.USUARIOS.PREENCHEREMAIL).type(email);
 });

 Then('o usuário {string} e email {string} deve ser removido do banco após o teste', (nomeUsuario, nomeEmail) => {
    cy.deletarUsuario(nomeUsuario);
    cy.deletarEmail(nomeEmail);
 });


Then('preencho o resumo {string} e preencho a descrição {string}' , (resumo, descricao) => {
 cy.get(loc.TAREFAS.RESUMO).type(resumo);
 cy.get(loc.TAREFAS.DESCRICAO).type(descricao);
});