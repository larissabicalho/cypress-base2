Feature: Gerenciar tarefas
  Como usuário autenticado
  Quero visualizar e manipular tarefas
  Para controlar o fluxo de trabalho do projeto

  Background: INICIO TESTE
  Given que estou na tela de login
  And logo no sistema admin

    Scenario: Visualizar detalhes de uma tarefa
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    When acesso a minha visão
    And seleciono a tarefa cadastrada
    Then deve visualizar tarefa
    And o projeto texto e issue devem ser removidos do banco após o teste
	
    Scenario: Copiar tarefa com sucesso
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    When acesso a minha visão
    And seleciono a tarefa cadastrada
    And copio a tarefa
    And confirmo a criação da tarefa
    And busco nova tarefa
    Then a nova tarefa deve ser criada com sucesso
    And o projeto texto e issue devem ser removidos do banco após o teste
    And issue nova devem ser removida do banco após o teste
	
    Scenario: Atualizar status da tarefa com sucesso
    Given que existe um projeto cadastrado no banco
    And busco dados projeto
    And existe um texto inserido
    And existe uma issue
    When acesso a minha visão
    And seleciono a tarefa cadastrada
    And altero o status da tarefa para resolvido
    And clico em alterar status
    And clico em resolver
    Then status esta resolvido
    And o projeto texto e issue devem ser removidos do banco após o teste
    And o monitoramento precisa ser apagado
	
   Scenario: Atribuir status da tarefa com sucesso
   Given que existe um projeto cadastrado no banco
   Given que eu acesso ao banco
   And busco dados projeto
   And existe um texto inserido
   And existe uma issue
   When acesso a minha visão
   And seleciono a tarefa cadastrada
   And busco usuario novo
   And atribuo um usuario
   And clico em atribuir
   Then verifico a atribuicao
   And deleto o usuario novo criado
   And o projeto texto e issue devem ser removidos do banco após o teste
   And o monitoramento precisa ser apagado

   Scenario: Relacionar Tarefas
   Given que existe um projeto cadastrado no banco
   And busco dados projeto
   And existe um texto inserido
   And existe uma issue
   And insiro uma nova issue a ser relacionada
   And busco a nova issue
   When acesso a minha visão
   And seleciono a tarefa cadastrada
   And relaciono uma issue com outra
   And clico em adicionar relacao
   Then verifico as relacoes entre issues
   And relacao entre as issues precisa ser apagada
   And o projeto textos e issues devem ser removidos do banco após o teste
   
   Scenario: Adicionar uma anotação com sucesso
   Given que existe um projeto cadastrado no banco
   And busco dados projeto
   And existe um texto inserido
   And existe uma issue
   When acesso a minha visão
   And seleciono a tarefa cadastrada
   And preencho a anotacao
   And adiciono a anotacao
   Then verifico a anotacao
   And o projeto texto e issue devem ser removidos do banco após o teste
   And anotacao deve ser removida
   And texto a anotacao deve ser removida
   And revision deve ser removido
   
   Scenario: Apagar uma anotação com sucesso
   Given que existe um projeto cadastrado no banco
   And busco dados projeto
   And existe um texto inserido
   And existe uma issue
   When acesso a minha visão
   And seleciono a tarefa cadastrada
   And preencho a anotacao
   And adiciono a anotacao
   And apago a anotacao
   And confirmo que quero apagar
   Then verifico a anotacao que nao tem que estar
   And o projeto texto e issue devem ser removidos do banco após o teste
   
   
   Scenario: Editar uma anotação com sucesso
   Given que existe um projeto cadastrado no banco
   And busco dados projeto
   And existe um texto inserido
   And existe uma issue
   When acesso a minha visão
   And seleciono a tarefa cadastrada
   And preencho a anotacao
   And adiciono a anotacao
   And edito a anotacao
   And preencho a anotacao editada
   And Atualizo
   Then verifico a anotacao editada
   And o projeto texto e issue devem ser removidos do banco após o teste
   And anotacao deve ser removida
   And texto a anotacao deve ser removida
   And revision deve ser removido
   
   Scenario: Adicionar um Marcador a tarefa
   Given que existe um projeto cadastrado no banco
   And busco dados projeto
   And existe um texto inserido
   And existe uma issue
   When acesso a minha visão
   And seleciono a tarefa cadastrada
   And preencho uma tag
   And clico em aplicar
   Then verifico a tag aplicada
   And o projeto texto e issue devem ser removidos do banco após o teste
   And tag e bugtag devem ser removidos
   
   
   Scenario: Apagar uma tarefa
   Given que existe um projeto cadastrado no banco
   And busco dados projeto
   And existe um texto inserido
   And existe uma issue
   When acesso a minha visão
   And seleciono a tarefa cadastrada
   And apago uma tarefa
   And confirmo a exclusão de uma tarefa   
   Then não deve ter issue aparecendo 
   And o projeto texto e issue devem ser removidos do banco após o teste