Feature: Gerenciar marcadores
  Como usuário autenticado
  Quero criar e apagar marcadores
  Para organizar melhor as tarefas do sistema

  Background:
    Given que estou na tela de login
    And logo no sistema admin

    	
	Scenario: Criar marcador com sucesso
    Given clico em gerenciar
    And clico em gerenciar marcador
    And preencho nome marcador
    And preencho descricao marcador
    And clico em criar marcador
    Then verifico a tag aplicada
    And deleto o texto do banco 
    And deleto o marcador

    
  Scenario: Deletar marcador com sucesso
   Given pego um marcador inserido
   And clico em gerenciar
   And clico em gerenciar marcador
   And seleciono um marcador
   And clico em apagar marcador
   And confirmo a exclusão do marcador
   Then verifico que o marcador não tem que estar

   Scenario: Criar marcador sem nome 
   Given clico em gerenciar
   And clico em gerenciar marcador
   And preencho descricao marcador
   And clico em criar marcador
   Then verifico que nao criou marcador