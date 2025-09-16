Feature: Gerenciar Projetos e Categorias
  Como um usuário autenticado
  Quero criar, editar e excluir projetos e categorias
  Para que eu possa manter a organização do sistema

  Background:
    Given que estou na tela de login
    And logo no sistema admin

  Scenario: Criar projeto com sucesso
    Given clico em gerenciar
    And que gerenciamento de projetos
    And clico em criar novo projeto
    And preencho os dados de um novo projeto
    And confirmo a criação
    Then o projeto deve ser criado e listado corretamente no sistema
    And deleto o projeto

  Scenario: Criar categoria com sucesso
    Given clico em gerenciar
    And que gerenciamento de projetos
    And preencho o nome da categoria
    And clico em adicionar categoria
    Then verifico se a categoria existe
    And deleto a categoria

  Scenario: Apagar categoria com sucesso
    Given tenho uma categoria
    Given clico em gerenciar
    And que gerenciamento de projetos
    And clico em apagar
    And confirmo que desejo apagar
    Then verifico que a categoria não existe mais


  Scenario: Editar categoria com sucesso
    Given tenho uma categoria
    Given clico em gerenciar
    And que gerenciamento de projetos
    And clico em editar
    And coloco outro nome
    And atualizo a categoria
    Then verifico que a categoria mudou nome
    And deleto a categoria alterada