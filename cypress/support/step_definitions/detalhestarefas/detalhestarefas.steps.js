import loc from '../../locators';
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import '../../commandsTarefa';
import '../../commandsProjeto';
import { GerarDados } from '../../gerarDados';

Then('existe um texto inserido', () => {
  cy.inserirTextoIssue().then((texto) => {
    cy.log(`Texto Inserido: ${texto.description}`);
  });
  cy.retornaDadosTexto().then((textoDesc) => {
    cy.wrap(textoDesc[0]).as("idTextoSistema"); // alias definido imediatamente
  });
});

Then('busco dados projeto', () => {
  cy.retornarDadosProjeto().then((projeto) => {
    cy.wrap(projeto[0]).as("projetoValor"); // alias definido imediatamente
  });
});

Then('existe uma issue', () => {
  cy.get('@projetoValor').then((projeto) => {
    cy.get('@idTextoSistema').then((texto) => {
      cy.log(`Projeto: ${projeto.id} - ${projeto.name}`);
      cy.inserirIssue(projeto.id, texto.id).then(() => {
        cy.log(`Issue gerada`);
      });
    });
  });
  cy.retornaDadosIssue().then((res) => {
    cy.wrap(res[0]).as("idIssueSistema");
  });
});

When('acesso a minha visão', () => {
  cy.clicarEmMinhaVisao().then(() => {
  });
});

Then('seleciono a tarefa cadastrada', () => {
  cy.get('@idIssueSistema').then((idIssue) => {
    cy.get('#unassigned > .widget-body > .widget-main > .table-responsive > .table > tbody > .my-buglist-bug > .nowrap > [href="/view.php?id=' + idIssue.id + '"]').click();
  });
});

Then('deve visualizar tarefa', () => {
  cy.get('@idIssueSistema').then((issue) => {
    cy.get(loc.TAREFAS.CONFERIRISSUE, { timeout: 20000 })
      .invoke('text')
      .then((texto) => {
        const issueFeita = texto;
        expect(issueFeita).to.include(issue.id);
      });
  });
});

Then('o projeto texto e issue devem ser removidos do banco após o teste', () => {
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
  cy.get('@idIssueSistema').then((issue) => {
    cy.deletarBugHistory(issue.id).then(() => {
      cy.log(`Bug History Deletado`);
    });
  });
});

Then('copio a tarefa', () => {
  cy.get(loc.TAREFAS.COPIARISSUE).click();
});

Then('busco nova tarefa', () => {
  cy.retornaDadosIssue().then((res) => {
    cy.wrap(res[0]).as("idIssueSistemaNova");
  });
});

Then('a nova tarefa deve ser criada com sucesso', () => {
  cy.get('@idIssueSistemaNova').then((issue) => {
    cy.get(loc.TAREFAS.CONFERIRISSUE, { timeout: 20000 })
      .invoke('text')
      .then((texto) => {
        const issueFeita = texto;
        expect(issueFeita).to.include(issue.id);
      });
  });
});

Then('issue nova devem ser removida do banco após o teste', () => {
  cy.get('@projetoValor').then((projeto) => {
    cy.deletarIssue(projeto.id).then(() => {
      cy.log(`Issue Copia deletada`);
    });
  });
});

Then('altero o status da tarefa para resolvido', () => {
  cy.get(loc.TAREFAS.SELECIONARRESOLVIDO).select('resolvido');
});

Then('clico em alterar status', () => {
  cy.get(loc.TAREFAS.ALTERARSTATUS).click();
});


Then('o monitoramento precisa ser apagado', () => {
  cy.get('@idIssueSistema').then((issue) => {
    cy.deletarMonitoramento(issue.id).then(() => {
      cy.log(`Monitoramento Deletado`);
    });
  });
});

Then('clico em resolver', () => {
  cy.get(loc.TAREFAS.RESOLVERTAREFAS).click();
});

Then('status esta resolvido', () => {
  cy.get(loc.TAREFAS.STATUS, { timeout: 20000 })
    .invoke('text')
    .then((texto) => {
      const issueFeita = texto;
      expect(issueFeita).to.include('resolvido');
    });
});

Then('insiro uma nova issue a ser relacionada', () => {
  cy.inserirTextoIssue().then((texto) => {
    cy.log(`Texto Inserido: ${texto.description}`);
  });
  cy.retornaDadosTexto().then((textoDesc) => {
    cy.wrap(textoDesc[0]).as("idTextoSistemaRelacionada"); // alias definido imediatamente
  });
  cy.get('@projetoValor').then((projeto) => {
    cy.get('@idTextoSistemaRelacionada').then((texto) => {
      cy.log(`Projeto: ${projeto.id} - ${projeto.name}`);
      cy.inserirIssue(projeto.id, texto.id).then(() => {
        cy.log(`Issue gerada`);
      });
    });
  });
});

Then('busco a nova issue', () => {
  cy.retornaDadosIssue().then((res) => {
    cy.wrap(res[0]).as("idIssueNovaTarefa");
  });
});

Then('relacao entre as issues precisa ser apagada', () => {
  cy.get('@idIssueSistema').then((issue) => {
    cy.deletarRelacoes(issue.id).then(() => {
      cy.log(`Relacoes Deletadas`);
    });
  });
});

Then('relaciono uma issue com outra', () => {
  cy.get('@idIssueNovaTarefa').then((issue) => {
    cy.get(loc.TAREFAS.PREENCHERRELACOES).type(issue.id);
  });
});

Then('clico em adicionar relacao', () => {
  cy.get(loc.TAREFAS.ADICIONARELACAO).click();
});

Then('verifico as relacoes entre issues', () => {
  cy.get('@idIssueNovaTarefa').then((issue) => {
    cy.get('[href="view.php?id=' + issue.id + '"]').should('exist');
  });
});

Then('o projeto textos e issues devem ser removidos do banco após o teste', () => {
  cy.get('@projetoValor').then((projeto) => {
    cy.deletarProjeto(projeto.name).then(() => {
      cy.log(`Projeto Deletado`);
    });
    // nova
    cy.deletarIssue(projeto.id).then(() => {
      cy.log(`Issue Deletada`);
    });
    // antiga
    cy.deletarIssue(projeto.id).then(() => {
      cy.log(`Issue Deletada`);
    });
    // novo
    cy.deletarTexto().then(() => {
      cy.log(`Texto Deletado`);
    });
    //antigo
    cy.deletarTexto().then(() => {
      cy.log(`Texto Deletado`);
    });
  });
  cy.get('@idIssueSistema').then((issue) => {
    cy.deletarBugHistory(issue.id).then(() => {
      cy.log(`Bug History Deletado`);
    });
  });
  cy.get('@idIssueNovaTarefa').then((issue) => {
    cy.deletarBugHistory(issue.id).then(() => {
      cy.log(`Bug History Deletado`);
    });
  });
});

Then('atribuo um usuario', () => {
  cy.get("@usuarioNovo").then((usuario) => {
    cy.log('username' + usuario.username);
    cy.get(loc.TAREFAS.ATRIBUIRUSUARIO)
      .select(usuario.username);
  });
});

Then('clico em atribuir', () => {
  cy.get(loc.TAREFAS.ATRIBUIR).click();
});

Then('verifico a atribuicao', () => {
  cy.get('@usuarioNovo').then((user) => {
    cy.get(loc.TAREFAS.VERIFICAATRIBUIR, { timeout: 20000 })
      .invoke('text')
      .then((texto) => {
        const usuarioFeito = texto;
        expect(usuarioFeito).to.include(user.username);
      });
  });
});

Then('deleto o usuario novo criado', () => {
  cy.get("@usuarioNovo").then((usuario) => {
    cy.deletarUsuario(usuario.username).then(() => {
      cy.log(`Usuário Novo deletado: ${usuario.username}`);
    });
  });
});

Then('preencho a anotacao', () => {
  const anota = GerarDados.descricaoAnotacoes();
  cy.wrap(anota).as("anotaTexto");
  cy.get(loc.TAREFAS.PREENCHERANOTACAO).type(anota);
});

Then('adiciono a anotacao', () => {
  cy.get(loc.TAREFAS.ADICIONARANOTACAO).click();
});

Then('anotacao deve ser removida', () => {
  cy.buscarAnotacoes().then((res) => {
    cy.wrap(res[0]).as("buscarAnotacoes");
  });
  cy.get("@buscarAnotacoes").then((note) => {
    cy.deletarNote(note.id).then(() => {
      cy.log(`Nota deletada: ${note.id}`);
    });
  });

});

Then('texto a anotacao deve ser removida', () => {
  cy.buscarAnotacoesTexto().then((res) => {
    cy.wrap(res[0]).as("buscarAnotacoesTexto");
  });
  cy.get("@buscarAnotacoesTexto").then((noteTexto) => {
    cy.deletarNoteText(noteTexto.id).then(() => {
      cy.log(`Texto da nota deletada: ${noteTexto.id}`);
    });
  });
});

Then('verifico a anotacao', () => {
  cy.get("@anotaTexto").then((anota) => {
    cy.get(loc.TAREFAS.BUGNOTE, { timeout: 20000 })
      .invoke('text')
      .then((texto) => {
        const notaTexto = texto;
        cy.log('texto' + anota);
        expect(notaTexto).to.include(anota);
      });
  });
});

Then('apago a anotacao', () => {
 cy.buscarAnotacoes().then((res) => {
    cy.wrap(res[0]).as("buscarAnotacoesApagar");
  });
 cy.get("@buscarAnotacoesApagar").then((anota) => {
 cy.get(`[href*="${anota.id}"]`)
  .filter(':visible')
  .first()
  .scrollIntoView()
  .trigger('mouseover');
   cy.contains('button', 'Apagar').click();
 });
});

Then('confirmo que quero apagar', () => {
  cy.get(loc.TAREFAS.CONFIRMOAPAGAR).click();
});

Then('verifico a anotacao que nao tem que estar', () => {
  cy.get(loc.TAREFAS.BUGNOTE, { timeout: 20000 })
    .should('not.exist')
});

Then('edito a anotacao', () => {
  cy.buscarAnotacoes().then((res) => {
    cy.wrap(res[0]).as("buscarAnotacoesEditar");
  });
  cy.get("@buscarAnotacoesEditar").then((anota) => {
   cy.get(`[href*="${anota.id}"]`)
  .filter(':visible')
  .first()
  .scrollIntoView()
  .trigger('mouseover');
  cy.contains('button', 'Alterar').click();
  });
});

Then('preencho a anotacao editada', () => {
  const anota = GerarDados.descricaoAnotacoesModificado();
  cy.wrap(anota).as("anotaTextoModificado");
  cy.get(loc.TAREFAS.PREENCHERANOTACAO).clear();
  cy.get(loc.TAREFAS.PREENCHERANOTACAO).type(anota);
});

Then('verifico a anotacao editada', () => {
  cy.get("@anotaTextoModificado").then((anota) => {
    cy.get(loc.TAREFAS.BUGNOTE, { timeout: 20000 })
      .invoke('text')
      .then((texto) => {
        const notaTexto = texto;
        cy.log('texto' + anota);
        expect(notaTexto).to.include(anota);
      });
  });
});

Then('Atualizo', () => {
  cy.get(loc.TAREFAS.ATUALIZAR).click();
});

Then('preencho uma tag', () => {
  const descricaoTag = GerarDados.tagName();
  cy.get(loc.TAREFAS.PREENCHERMARCADOR).type(descricaoTag);
});

Then('clico em aplicar', () => {
  cy.get(loc.TAREFAS.APLICAR).click();
});

Then('tag e bugtag devem ser removidos', () => {
  cy.deletarTags().then(() => {
    cy.log(`Tag deletada`);
  });
  cy.deletarBugTags().then(() => {
    cy.log(`Bug Tag deletada`);
  });
});

Then('verifico a tag aplicada', () => {
  cy.retornaTags().then((tags) => {
    cy.get('[href="tag_view_page.php?tag_id=' + tags[0].id + '"]', { timeout: 20000 })
      .should('exist');
  });
});

Then('revision deve ser removido', () => {
  cy.deletarRevision().then(() => {
    cy.log(`Revision deletada`);
  });
});

Then('apago uma tarefa', () => {
  cy.get(loc.TAREFAS.APAGAR).click();
});

Then('confirmo a exclusão de uma tarefa', () => {
  cy.get(loc.TAREFAS.APAGARTAREFAS).click();
});

Then('não deve ter issue aparecendo', () => {
  cy.contains(loc.TAREFAS.CONFERIRISSUE, { timeout: 20000 })
    .should('not.exist');
});
