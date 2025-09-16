Feature: Filtrar Tarefas
  Como um usuário autenticado
  Quero filtrar, visualizar e manipular tarefas
  Para facilitar a gestão e organização das demandas no sistema

 Background: INICIO TESTE
  Given que estou na tela de login
  And logo no sistema admin


Scenario: Visualizar tarefas monitoradas com sucesso
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    And uma tarefa monitorada por adm foi criada
    And clico em ver tarefas
    And clico em monitorar
    When eu aplico o filtro para a pessoa
    And aplico o filtro
    Then a tarefa esta sendo exibida
    And redefino os filtros
    And deleto o monitoramento
    And o projeto texto e issue devem ser removidos do banco após o teste

   
	Scenario: Filtrar tarefas resolvidas
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue resolvido
    And clico em ver tarefas
    And clico em relacionados
    When eu aplico o filtro resolvido
    And aplico o filtro
    Then a tarefa resolvida foi exibida na listagem
    And redefino os filtros
    And o projeto texto e issue resolvida devem ser removidos do banco após o teste
	
	Scenario: Filtrar tarefas urgentes
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue urgente
    And clico em ver tarefas
    And clico em prioridades
    When eu aplico o filtro urgente
    And aplico o filtro
    Then a tarefa urgente foi exibida na listagem
    And redefino os filtros
    And o projeto texto e issue urgente devem ser removidos do banco após o teste
	
	Scenario: Fechar uma tarefa
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue 
    And clico em ver tarefas
    And acho tarefa cadastrada
    And seleciono fechar essa tarefa
    And clico em Ok
    And clico no botao fechar
    And clico em estado
    And eu aplico o filtro fechado
    And aplico o filtro
    Then a tarefa esta sendo exibida
    And redefino os filtros
    And o projeto texto e issue devem ser removidos do banco após o teste
	
	Scenario: Editar resumo
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    And clico em ver tarefas
    And clico em editar a tarefa cadastrada
    And edito o resumo 
    And Atualizo a Issue
    Then deve visualizar resumo atualizado
    And o projeto texto e issue devem ser removidos do banco após o teste
    And revision deve ser removido