import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalStaticParameters } from '../../globalParameters.js';
import loc from '../../locators';

Then('verifico se baixou o arquivo {string}', (file) => {
  const fileName = file;
  const filePath = `cypress/downloads/${fileName}`;
  const isDocker = Cypress.env('DOCKER') === true || Cypress.env('DOCKER') === 'true';

  cy.task('log', `🔎 Verificando arquivo: ${fileName}`);
  cy.task('log', `🐳 Rodando em Docker? ${isDocker}`);

  if (!isDocker) {
    // Local
    cy.readFile(filePath, { timeout: 20000, log: true }).then((conteudo) => {
      cy.task('log', `✅ Arquivo ${fileName} encontrado localmente (${conteudo.length} bytes)`);
        // Deleta o arquivo local após processar
        cy.task('deleteFile', { fileName, local: true }).then((resDel) => {
          cy.task('log', `🗑️ Resultado da deleção local: ${JSON.stringify(resDel)}`);
          expect(resDel.deleted, 'Arquivo local deve ser deletado').to.be.true;
        });
      });
  } else {
    // Docker → WebDAV
    cy.task('listWebdavFiles').then((files) => {
      cy.task('log', `📑 Arquivos no WebDAV: ${files.join(', ')}`);

      return cy.wrap(files).each((f) => cy.task('log', `- ${f}`)).then(() => files);
    })
    .then((files) => {
      const found = files.find(f => f === fileName || f.endsWith(fileName));
      expect(found, `Verifica se ${fileName} existe no WebDAV`).to.exist;
        
      return cy.task('deleteFile', { fileName });
    })
    .then((resDel) => {
      cy.task('log', `🗑️ Resultado da deleção no WebDAV: ${JSON.stringify(resDel)}`);
      expect(resDel.deleted, 'Arquivo deve ser deletado do WebDAV').to.be.true;
    });
  }
});



When('eu clico em Exportar CSV', () => {
  cy.get(loc.VERTAREFAS.VERCSV).click();
});

When('eu clico em Exportar Excel', () => {
  cy.get(loc.VERTAREFAS.VEREXCEL).click();
});

When('eu clico em Imprimir', () => {
  cy.get(loc.VERTAREFAS.IMPRIMIR).click();
});

When('clico em Exporta Word', () => {
  cy.get(loc.VERTAREFAS.WORD).click();
});
