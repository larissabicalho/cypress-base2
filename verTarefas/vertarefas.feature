Feature: Visualizar e Exportar Tarefas
  Como um usuário autenticado
  Quero visualizar as tarefas e exportar os dados em diferentes formatos
  Para registrar e compartilhar informações das tarefas do sistema

  Background:
    Given que estou na tela de login
    And logo no sistema admin

  Scenario: Visualizar lista de tarefas com sucesso
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    And clico em ver tarefas
    Then a tarefa esta sendo exibida
    And o projeto texto e issue devem ser removidos do banco após o teste

  Scenario: Exportar tarefas para CSV
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    And clico em ver tarefas
    When eu clico em Exportar CSV
    Then verifico se baixou o arquivo "administrator.csv"
    And o projeto texto e issue devem ser removidos do banco após o teste

  Scenario: Exportar tarefas para Excel
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    And clico em ver tarefas
    When eu clico em Exportar Excel
    Then verifico se baixou o arquivo "administrator.xml"
    And o projeto texto e issue devem ser removidos do banco após o teste

  Scenario: Imprimir Tarefas
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    And clico em ver tarefas
    When eu clico em Imprimir
    And clico em Exporta Word
    Then verifico se baixou o arquivo "administrator.doc"
    And o projeto texto e issue devem ser removidos do banco após o teste
