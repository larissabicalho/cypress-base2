Feature: Visualizar e gerenciar tarefas na tela Minha Visão
  Como um usuário autenticado
  Quero visualizar tarefas atribuídas, não atribuídas, relatadas, resolvidas, monitoradas e modificadas
  Para acompanhar facilmente meu trabalho no sistema

  Background:
    Given que estou na tela de login
    And logo no sistema admin

  Scenario: Visualizar tarefas atribuídas
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma tarefa atribuída a mim no sistema
    When acesso a minha visão
    And clico em Atribuídas a mim
    Then a tarefa atribuída deve ser exibida na lista
    And o projeto texto e issue handler devem ser removidos do banco após o teste



  Scenario: Visualizar tarefas não atribuídas
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    When acesso a minha visão
    And clico em Não atribuídas
    Then a tarefa deve ser exibida na lista
    And o projeto texto e issue devem ser removidos do banco após o teste


  Scenario: Visualizar tarefas relatadas
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    When acesso a minha visão
    And clico em Relatadas por mim
    Then a tarefa deve ser exibida na lista
    And o projeto texto e issue devem ser removidos do banco após o teste


  Scenario: Visualizar tarefas resolvidas
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue resolvido
    When acesso a minha visão
    And clico em Resolvidas por mim
    Then a tarefa resolvida deve ser exibida na lista
    And o projeto texto e issue resolvida devem ser removidos do banco após o teste


  Scenario: Visualizar tarefas monitoradas
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    And uma tarefa monitorada por adm foi criada
    When acesso a minha visão
    And clico em Monitoradas por mim
    And deleto o monitoramento
    Then a tarefa deve ser exibida na lista
    And o projeto texto e issue devem ser removidos do banco após o teste

  Scenario: Visualizar tarefas modificadas recentemente
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma tarefa atribuída a mim no sistema
    When acesso a minha visão
    And clico em Modificadas Recentemente
    Then a tarefa atribuída deve ser exibida na lista
    And o projeto texto e issue handler devem ser removidos do banco após o teste


  Scenario: Fazer logout do sistema
    When eu clico na conta
    And clico para sair da conta
    Then devo visualizar o campo de login novamente