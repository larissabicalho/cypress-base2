import loc from './locators.js';
import { GerarDados } from './gerarDados.js';
import { GlobalStaticParameters } from './globalParameters.js';

Cypress.Commands.add("clicarEmVerTarefas", () => {
    cy.get(loc.TAREFAS.VERTAREFA).click();
    cy.get(loc.TAREFAS.CRIARTAREFA).click();
});

Cypress.Commands.add("verTarefas", () => {
    cy.get(loc.TAREFAS.VERTAREFA).click();
});


Cypress.Commands.add("deletarIssue", (idProjetoText) => {
  const dados = {
    idProjeto: idProjetoText
  };
  return cy.task("queryFromFile", {
    fileName: "deletarIssue.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Projeto deletado com sucesso: ${dados.idProjeto}`);
  });
});

Cypress.Commands.add("deletarTexto", () => {
  return cy.task("queryFromFile", {
    fileName: "deletarTexto.sql",
    replacements: {},
  }).then(() => {
    cy.log(`Texto deletado`);
  });
});

Cypress.Commands.add("deletarAttachment", () => {
  return cy.task("queryFromFile", {
    fileName: "deletarAttachment.sql",
    replacements: {},
  }).then(() => {
    cy.log(`Texto deletado`);
  });
});

Cypress.Commands.add("deletarBugHistory", (issue) => {
  const dados = {
    bug_id: issue
  };
  return cy.task("queryFromFile", {
    fileName: "deletarBugHistory.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Projeto deletado com sucesso: ${dados.bug_id}`);
  });
});

Cypress.Commands.add("inserirIssue", (idProjeto, idTexto) => {
  const dados = {
    project_id: idProjeto,
    bug_text_id: idTexto,
    summary: GerarDados.sumarioIssue(),
    date_submitted: GerarDados.gerarData(),
    last_updated: GerarDados.gerarData(),
  };
  return cy.task("queryFromFile", {
    fileName: "inserirIssue.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Issue inserida com sucesso: ${dados.project_id}`);
    return cy.wrap(dados); 
  });
});

Cypress.Commands.add("inserirIssueHandler", (idProjeto, idTexto) => {
  const dados = {
    project_id: idProjeto,
    bug_text_id: idTexto,
    summary: GerarDados.sumarioIssue(),
    date_submitted: GerarDados.gerarData(),
    last_updated: GerarDados.gerarData(),
  };
  return cy.task("queryFromFile", {
    fileName: "inserirIssueHandler.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Issue inserida com sucesso: ${dados.project_id}`);
    return cy.wrap(dados); 
  });
});

Cypress.Commands.add("inserirTextoIssue", () => {
  const dados = {
    description: GerarDados.descricaoTexto(),
  };
  return cy.task("queryFromFile", {
    fileName: "inserirTextoIssue.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Texto inserido com sucesso: ${dados.description}`);
    return cy.wrap(dados); 
  });
});

Cypress.Commands.add("retornaDadosIssue", () => {
  return cy.task("queryFromFile", {
    fileName: "retornarDadosIssue.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Issue Retornada: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});

Cypress.Commands.add("retornaDadosTexto", () => {
  return cy.task("queryFromFile", {
    fileName: "retornarDadosTexto.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Issue Retornada: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});

Cypress.Commands.add("clicarEmMinhaVisao", () => {
    cy.get(loc.TAREFAS.MINHAVISAO).click();
});


Cypress.Commands.add("deletarMonitoramento", (issue) => {
  const dados = {
    bug_id: issue
  };
  return cy.task("queryFromFile", {
    fileName: "deletarMonitoramento.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Monitoramento deletado com sucesso: ${dados.bug_id}`);
  });
});

Cypress.Commands.add("deletarRelacoes", (issue) => {
  const dados = {
    source_bug_id: issue
  };
  return cy.task("queryFromFile", {
    fileName: "deletarRelacoes.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Relações deletadas com sucesso: ${dados.source_bug_id}`);
  });
});


Cypress.Commands.add("buscarAnotacoes", () => {
  return cy.task("queryFromFile", {
    fileName: "retornarIdNote.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Buscar Anotacoes: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});

Cypress.Commands.add("buscarAnotacoesTexto", () => {
  return cy.task("queryFromFile", {
    fileName: "retornarIdNoteText.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Buscar Anotacoes Texto: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});

Cypress.Commands.add("deletarNote", (note) => {
  const dados = {
      id: note
  };
  return cy.task("queryFromFile", {
    fileName: "deletarNote.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Nota deletada com sucesso: ${dados.id}`);
  });
});

Cypress.Commands.add("deletarNoteText", (note) => {
  const dados = {
     id: note
  };
  return cy.task("queryFromFile", {
    fileName: "deletarNoteText.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Texto da Nota deletado com sucesso: ${dados.id}`);
  });
});

Cypress.Commands.add("deletarTags", () => {
  return cy.task("queryFromFile", {
    fileName: "deletarTags.sql",
    replacements: {},
  }).then(() => {
    cy.log(`Tags deletada com sucesso`);
  });
});

Cypress.Commands.add("deletarBugTags", () => {
  return cy.task("queryFromFile", {
    fileName: "deletarBugTags.sql",
    replacements: {},
  }).then(() => {
    cy.log(`Bug tags deletado com sucesso`);
  });
});

Cypress.Commands.add("retornaTags", () => {
  return cy.task("queryFromFile", {
    fileName: "retornaTags.sql",
    replacements: {},
  }).then((result) => {
    cy.log(`Buscar Anotacoes Texto: ${JSON.stringify(result)}`);
    return cy.wrap(result); 
  });
});

Cypress.Commands.add("deletarRevision", () => {
  return cy.task("queryFromFile", {
    fileName: "deletarRevision.sql",
    replacements: {},
  }).then(() => {
    cy.log(`Revision deletado com sucesso`);
  });
});

Cypress.Commands.add("inserirMonitoramento", (idIssue) => {
  const dados = {
    bug_id: idIssue,
  };

return cy.task("queryFromFile", {
    fileName: "inserirMonitoramento.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Monitoramento inserido com sucesso: ${dados.bug_id}`);
    return cy.wrap(dados); 
  });
});

Cypress.Commands.add("deletarMonitoramento", (idIssue) => {
  const dados = {
    bug_id: idIssue,
  };

return cy.task("queryFromFile", {
    fileName: "deletarMonitoramento.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Monitoramento deletado com sucesso: ${dados.bug_id}`);
    return cy.wrap(dados); 
  });
});

Cypress.Commands.add("inserirIssueResolvida", (idProjeto, idTexto) => {
  const dados = {
    project_id: idProjeto,
    bug_text_id: idTexto,
    summary: GerarDados.sumarioIssue(),
    date_submitted: GerarDados.gerarData(),
    last_updated: GerarDados.gerarData(),
  };
  return cy.task("queryFromFile", {
    fileName: "inserirIssueResolvida.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Issue inserida com sucesso: ${dados.project_id}`);
    return cy.wrap(dados); 
  });
});

Cypress.Commands.add("inserirIssueUrgente", (idProjeto, idTexto) => {
  const dados = {
    project_id: idProjeto,
    bug_text_id: idTexto,
    summary: GerarDados.sumarioIssue(),
    date_submitted: GerarDados.gerarData(),
    last_updated: GerarDados.gerarData(),
  };
  return cy.task("queryFromFile", {
    fileName: "inserirIssueUrgente.sql",
    replacements: dados,
  }).then(() => {
    cy.log(`Issue inserida com sucesso: ${dados.project_id}`);
    return cy.wrap(dados); 
  });
});

