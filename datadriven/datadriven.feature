Feature: Data Driven

    Background:
        Given que estou na tela de login
        And logo no sistema admin

    Scenario: Criar projeto com sucesso
        Given clico em gerenciar
        And que gerenciamento de projetos
        And clico em criar novo projeto
        When eu criar um projeto com nome "<nomeProjeto>"
        And confirmo a criação
        Then o projeto "<nomeProjeto>" deve estar cadastrado corretamente
        And deleto o projeto "<nomeProjeto>"
        Examples:
            | nomeProjeto |
            | Projeto A   |
            | Projeto B   |
            | Projeto C   |

    Scenario: Criar marcador com sucesso
        Given clico em gerenciar
        And clico em gerenciar marcador
        When eu criar um marcador com nome "<nomeMarcador>" e a descricao "<descricaoMarcador>"
        And clico em criar marcador
        Then verifico a tag aplicada
        And deleto o texto do banco
        And deleto o marcador "<nomeMarcador>" do data driven
        Examples:
            | nomeMarcador | descricaoMarcador    |
            | marcador1    | descricao marcador 1 |
            | marcador2    | descricao marcador 2 |
            | marcador3    | descricao marcador 3 |
            | marcador4    | descricao marcador 4 |


    Scenario: Criar usuarios com sucesso
        Given clico em gerenciar
        And que gerenciamento de usuarios
        And clico em nova conta
        When preencho o nome "<nomeUsuario>" e preencho nome verdadeiro "<nomeVerdadeiro>" e o email "<email>"
        And clico em criar usuario
        And que gerenciamento de usuarios
        Then o usuário deve ser cadastrado com sucesso no banco de dados
        And o usuário "<nomeUsuario>" e email "<email>" deve ser removido do banco após o teste

        Examples:
            | nomeUsuario | nomeVerdadeiro   | email             |
            | user1       | Usuario Larissa  | lari@teste.com    |
            | user2       | Usuario Leonardo | leo@teste.com     |
            | user3       | Usuario Marcelo  | marcelo@teste.com |
            | user4       | Usuario Joana    | joana@teste.com   |
            | user5       | Usuario Joaquim  | joaquim@teste.com |

    Scenario: Criar tarefa com sucesso
        Given clico em gerenciar
        Given que existe um projeto cadastrado no banco
        And acesso a tela de criar tarefas
        And preencho o resumo "<resumo>" e preencho a descrição "<descricao>"
        And confirmo a criação da tarefa
        Then a tarefa deve ser criada com sucesso no sistema
        And a tarefa deve existir no banco de dados
        And o projeto e a tarefa devem ser removidos do banco após o teste

        Examples:
            | resumo | descricao    |
            | issue1 | Issue TESTE1 |
            | issue2 | Issue TESTE2 |
            | issue3 | Issue TESTE3 |
            | issue4 | Issue TESTE4 |
            | issue5 | Issue TESTE5 |
