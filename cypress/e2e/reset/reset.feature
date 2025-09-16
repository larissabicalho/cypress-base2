Feature: Reset de senha
  Como usuário
  Quero redefinir minha senha
  Para poder acessar minha conta caso a tenha esquecido

  Background:
     Given que estou na tela de login

Scenario: Reset de senha com sucesso
   Given que eu acesso ao banco
   When informo o usuario valido
   And clico no botao login
   And clico em esqueci a senha
   And preencho o email do reset
   And clico em enviar
   And deleto o usuario criado e email
   Then devo visualizar o campo de login novamente

 
