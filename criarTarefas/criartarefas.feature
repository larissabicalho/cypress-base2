Feature: Criar Tarefas
  Como usuário logado
  Quero criar tarefas no sistema
  Para gerenciar atividades no Mantis

  Background: INICIO TESTE
  Given que estou na tela de login
  And logo no sistema admin

  @criarTarefa
  Scenario: Criar tarefa com sucesso
    Given que existe um projeto cadastrado no banco
    And acesso a tela de criar tarefas
    And preencho o resumo 
    And preencho a descrição
    And confirmo a criação da tarefa
    Then a tarefa deve ser criada com sucesso no sistema
    And a tarefa deve existir no banco de dados
    And o projeto e a tarefa devem ser removidos do banco após o teste

  @criarTarefaComAttachment
  Scenario: Criar tarefa com sucesso e arquivo
    Given que existe um projeto cadastrado no banco
    And acesso a tela de criar tarefas
    And preencho o resumo 
    And preencho a descrição
    And adiciono o arquivo
    And confirmo a criação da tarefa
    Then a tarefa deve ser criada com sucesso no sistema
    And a tarefa deve existir no banco de dados
    And o projeto e a tarefa devem ser removidos do banco após o teste
    And o arquivo precisa ser removido
