Feature: Login no sistema
  Como usuário do sistema
  Quero realizar login
  Para acessar as funcionalidades da aplicação

Background: INICIO TESTE
  Given que estou na tela de login

Scenario: Acessar a tela de login
   Given que eu acesso ao banco
   When informo o usuario valido
   And clico no botao login
   And informo a senha correta
   And clico no botao login
   Then devo ser autenticado com sucesso
   And deleto o usuario criado e email

Scenario: Efetuar login com email errado
   When eu preencho o usuário incorreto
   And clico no botao login
   And informo a senha correta
   And clico no botao login
   Then devo ver a mensagem de erro de email

 Scenario: Efetuar login com senha errada
    Given que existe um usuário cadastrado no sistema
    When eu preencho o campo usuário com um login válido
    And clico no botao login
    And eu preencho o campo senha com uma senha inválida
    And clico no botao login
   Then devo ver a mensagem de erro de email
    

 Scenario: Tentativa de login com email em branco
    When ele não preenche o campo de email
    And clico no botao login
     Then devo ver a mensagem de erro de email

 Scenario: Tentativa de login com senha em branco
   Given que existe um usuário cadastrado no sistema
   When eu preencho o campo usuário com um login válido
   And clico no botao login
   And não preenche a senha
   And clico no botao login
   Then devo ver a mensagem de erro de email


 Scenario: Efetuar login com username contendo caractere especial
    When eu preencho o campo usuário com um valor contendo caractere especial
    And clico no botao login
    Then devo ver a mensagem de erro de email

