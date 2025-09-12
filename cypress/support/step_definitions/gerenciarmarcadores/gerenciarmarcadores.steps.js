import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import '../../commandsMarcadores';
import { GerarDados } from '../../gerarDados';
import loc from '../../locators';

Then('clico em gerenciar', () => {
  cy.clicarGerenciar();
});

Then('clico em gerenciar marcador', () => {
  cy.verMarcadores();
});

Then('preencho nome marcador', () => {
  const marcadores = GerarDados.nomeMarcador();
  cy.wrap(marcadores).as("nomeDoMarcador");
  cy.get(loc.MARCADORES.NOMEMARCADORES).type(marcadores);
});

Then('preencho descricao marcador', () => {
  const marcadoresDesc = GerarDados.descricaoTexto();
  cy.wrap(marcadoresDesc).as("descricaoMarcador");
  cy.get(loc.MARCADORES.DESCRICAOMARCADORES).type(marcadoresDesc);
});

Then('clico em criar marcador', () => {
  cy.get(loc.MARCADORES.BUTTONMARCADORES).click();
});

Then('deleto o texto do banco', () => {
  cy.deletarTexto().then(() => {
    cy.log(`Texto Deletado`);
  });
});

Then('deleto o marcador', () => {
  cy.get('@nomeDoMarcador').then((marcador) => {
    cy.deletarMarcadores(marcador).then(() => {
      cy.log(`Marcador Deletado`);
    });
  });
});

Then('pego um marcador inserido', () => {
  cy.inserirMarcadores().then(() => {
    cy.log(`Marcador gerado`);
  });
});


Then('seleciono um marcador', () => {
  cy.retornaTags().then((marcador) => {
    cy.wrap(marcador).as("marcadorValido");
  });
  cy.get('@marcadorValido').then((marcador) => {
    cy.get('[href="tag_view_page.php?tag_id=' + marcador[0].id + '"]').click();
  });
});

Then('clico em apagar marcador', () => {
  cy.get(loc.MARCADORES.APAGARMARCADOR).click();
});

Then('confirmo a exclusão do marcador', () => {
  cy.get(loc.MARCADORES.CONFIRMARAPAGARMARCADOR).click();
});

Then('verifico que o marcador não tem que estar', () => {
  cy.get('@marcadorValido').then((marcador) => {
    cy.get('[href="tag_view_page.php?tag_id=' + marcador[0].name + '"]').should('not.exist');
  });
});

Then('verifico que nao criou marcador', () => {
  const texto = "Marcador Teste Larissa";
  cy.log("teste" + texto);
  cy.get('body').then($body => {
    expect($body.find(`a:contains('${texto}')`).length).to.eq(0);
  })

});
