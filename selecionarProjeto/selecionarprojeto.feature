Feature: Seleção de Projetos
  Como usuário
  Quero selecionar um projeto
  Para gerenciar ou visualizar suas informações

 Background:
    Given que estou na tela de login
    And logo no sistema admin


  Scenario: Selecionar projeto com sucesso
    Given que existe um projeto cadastrado no banco
    When acesso a minha visão
    And clico em todos projetos
    And seleciono o projeto
    Then o projeto deve estar selecionado
    And o projeto deve ser removido do banco após o teste