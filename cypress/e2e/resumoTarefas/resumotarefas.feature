Feature: Resumo de Tarefas
  Como usuário
  Quero visualizar o resumo das minhas tarefas
  Para ter uma visão geral do que precisa ser feito

 Background:
    Given que estou na tela de login
    And logo no sistema admin

  Scenario: Visualizar resumo com sucesso
    Given acesso Resumo
    Then devo visualizar os elementos do resumo de tarefas
