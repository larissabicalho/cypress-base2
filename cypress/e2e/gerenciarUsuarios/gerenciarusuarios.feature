Feature: Gerenciar Usuários
  Como administrador logado
  Quero gerenciar usuários do sistema
  Para manter o controle de acessos

  Background:
    Given que estou na tela de login
    And logo no sistema admin

  Scenario: Criar usuário com sucesso
    Given clico em gerenciar
    And que gerenciamento de usuarios
    And clico em nova conta 
    And preencho o nome do usuario
    And preencho o nome verdadeiro
    And preencho o email 
    And clico em criar usuario 
    And que gerenciamento de usuarios
    Then o usuário deve ser cadastrado com sucesso no banco de dados
    And o usuário e email deve ser removido do banco após o teste

    Scenario: Criar usuário sem campos obrigatórios
    Given clico em gerenciar
    And que gerenciamento de usuarios
    And clico em nova conta 
    And clico em criar usuario 
    Then mensagem e exibida de erro