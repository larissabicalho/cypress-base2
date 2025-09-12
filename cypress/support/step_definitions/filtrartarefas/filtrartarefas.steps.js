import loc from '../../locators';
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import '../../commandsTarefa';
import { GlobalStaticParameters } from '../../globalParameters.js';
import { GerarDados } from '../../gerarDados';
 
When('uma tarefa monitorada por adm foi criada', () => {
  cy.get('@idIssueSistema').then((issue) => {
    cy.inserirMonitoramento(issue.id).then(() => {
      cy.log(`Monitoramento gerado: ${issue.id}`);
    });
  });
});

When('deleto o monitoramento', () => {
  cy.get('@idIssueSistema').then((issue) => {
    cy.deletarMonitoramento(issue.id).then(() => {
      cy.log(`Monitoramento deletado: ${issue.id}`);
    });
  });
});

Then('clico em ver tarefas', () => {
   cy.verTarefas();
});

When('eu aplico o filtro para a pessoa', () => {
cy.wait(2000);
 cy.get('#user_monitor_filter_target > .input-xs').select(GlobalStaticParameters.userPadrao);
  cy.wait(1000);
});

Then('clico em monitorar', () => {
    cy.get(loc.TAREFAS.MONITORAR).click();
});

Then('a tarefa esta sendo exibida', ()=> {
cy.get('@idIssueSistema').then((issue) => {
    cy.get('[href="/view.php?id='+issue.id+'"]').should('exist');
 });
});

Then('aplico o filtro', () => {
    cy.get(loc.TAREFAS.CLICOAPLICAR).click();
});


 Then('redefino os filtros', () => {
  cy.get(loc.TAREFAS.REDEFINIR).click();
 });

 Then('existe uma issue resolvido', () => {
  cy.get('@projetoValor').then((projeto) => {
    cy.get('@idTextoSistema').then((texto) => {
      cy.log(`Projeto: ${projeto.id} - ${projeto.name}`);
      cy.inserirIssueResolvida(projeto.id, texto.id).then(() => {
        cy.log(`Issue gerada`);     
      });
    });
  });
   cy.retornaDadosIssue().then((res) => {
      cy.wrap(res[0]).as("idIssueSistemaResolvido");
  });
});

Then('clico em relacionados', () => {
    cy.get(loc.TAREFAS.RELACIONADOS).click();
});

When('eu aplico o filtro resolvido', () => {
 cy.get(loc.TAREFAS.CLICORELACIONADOS).select(GlobalStaticParameters.filtroResolvido);
});

Then('a tarefa resolvida foi exibida na listagem', ()=> {
cy.get('@idIssueSistemaResolvido').then((issue) => {
    cy.get('[href="/view.php?id='+issue.id+'"]').should('exist');
 });
});

Then('o projeto texto e issue resolvida devem ser removidos do banco após o teste', () =>{
  cy.get('@projetoValor').then((projeto) => {
    cy.deletarProjeto(projeto.name).then(() => {
      cy.log(`Projeto Deletado`);
     });
    cy.deletarIssue(projeto.id).then(() => {
      cy.log(`Issue Deletada`);
     });
     cy.deletarTexto().then(() => {
      cy.log(`Texto Deletado`);
     });
   });
    cy.get('@idIssueSistemaResolvido').then((issue) => {
      cy.deletarBugHistory(issue.id).then(() => {
      cy.log(`Bug History Deletado`);
     });
    });
});

 Then('existe uma issue urgente', () => {
  cy.get('@projetoValor').then((projeto) => {
    cy.get('@idTextoSistema').then((texto) => {
      cy.log(`Projeto: ${projeto.id} - ${projeto.name}`);
      cy.inserirIssueUrgente(projeto.id, texto.id).then(() => {
        cy.log(`Issue gerada`);     
      });
    });
  });
   cy.retornaDadosIssue().then((res) => {
      cy.wrap(res[0]).as("idIssueSistemaUrgente");
  });
});

Then('clico em prioridades', () => {
    cy.get(loc.TAREFAS.PRIORIDADECLICK).click();
});

When('eu aplico o filtro urgente' , () =>{
    cy.get(loc.TAREFAS.PRIORIDADEURGENTE).select(GlobalStaticParameters.filtroUrgente);
});

Then('a tarefa urgente foi exibida na listagem', () => {
cy.get('@idIssueSistemaUrgente').then((issue) => {
    cy.get('[href="/view.php?id='+issue.id+'"]').should('exist');
 });
});

Then('o projeto texto e issue urgente devem ser removidos do banco após o teste', () => {
cy.get('@projetoValor').then((projeto) => {
    cy.deletarProjeto(projeto.name).then(() => {
      cy.log(`Projeto Deletado`);
     });
    cy.deletarIssue(projeto.id).then(() => {
      cy.log(`Issue Deletada`);
     });
     cy.deletarTexto().then(() => {
      cy.log(`Texto Deletado`);
     });
   });
    cy.get('@idIssueSistemaUrgente').then((issue) => {
      cy.deletarBugHistory(issue.id).then(() => {
      cy.log(`Bug History Deletado`);
     });
    });
});

Then('acho tarefa cadastrada', () => {
cy.get('@idIssueSistema').then((issue) => {
    cy.get('input[name="bug_arr[]"][value="'+issue.id+'"]').click({ force: true })
});
});

Then('seleciono fechar essa tarefa', () => {
  cy.get(loc.TAREFAS.SELECIONARFECHAR).select(GlobalStaticParameters.acao);
});

Then ('clico em Ok', () =>{
 cy.get(loc.TAREFAS.CLICAROK).click();
});

Then('clico no botao fechar', () => {
 cy.get(loc.TAREFAS.FECHARTAREFA).click();
});

Then('clico em estado', () => {
 cy.get(loc.TAREFAS.CLICARESTADO).click();
 cy.wait(2000);
});

 Then('eu aplico o filtro fechado', () => {
 cy.get(loc.TAREFAS.FECHADO).select(GlobalStaticParameters.fechado);
 });

 Then('a tarefa foi exibida na listagem', () => {
cy.get('@idIssueSistemaUrgente').then((issue) => {
    cy.get('[href="/view.php?id='+issue.id+'"]').should('exist');
});
 });

 
Then('clico em editar a tarefa cadastrada', () => {
    cy.get('@idIssueSistema').then((issue) => {
     cy.get('[href="bug_update_page.php?bug_id='+issue.id+'"] > .fa').click();
    });
});

Then('edito o resumo', () => {
  const descricaoModificada = GerarDados.descricaoTextoModificado();
  cy.wrap(descricaoModificada).as("description");
  cy.get(loc.TAREFAS.DESCRICAO).clear();
  cy.get(loc.TAREFAS.DESCRICAO).type(descricaoModificada);
});

Then('Atualizo a Issue' , () =>{
  cy.get(loc.TAREFAS.ATUALIZARISSUE).click();
});

Then ('deve visualizar resumo atualizado',() => {
cy.get("@description").then((anota) => {
    cy.get(loc.TAREFAS.DESCRIPTIONTEXTO,  { timeout: 20000 })
      .invoke('text')
      .then((texto) => {
        const notaTexto = texto;
        cy.log('texto' + anota);
        expect(notaTexto).to.include(anota);
      });
  });
});