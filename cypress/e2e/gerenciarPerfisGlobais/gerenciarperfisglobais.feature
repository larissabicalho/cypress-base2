Feature: Gerenciar Perfis Globais
  Como um administrador do sistema
  Quero gerenciar perfis globais
  Para que seja possível organizar as plataformas de teste

  Background:
    Given que estou na tela de login
    And logo no sistema admin

  @positivo
  Scenario: Criar perfil global com sucesso
    Given clico em gerenciar
    And clico em gerenciar perfil global
    And preencho o campo plataforma 
    And preencho o campo SO
    And preencho o campo versão SO
    And preencho o campo descrição da plataforma
    And clico em criar perfil global
    Then o perfil global deve ser criado com sucesso
   And devo tirar o perfil global do banco

  @negativo
  Scenario: Criar perfil global com erro
    Given clico em gerenciar
    And clico em gerenciar perfil global
    And preencho o campo plataforma 
    And clico em criar perfil global
    Then acontece um erro

   

