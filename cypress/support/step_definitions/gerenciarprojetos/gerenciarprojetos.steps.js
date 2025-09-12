import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import '../../commandsProjeto';
import { GerarDados } from '../../gerarDados';
import loc from '../../locators';

Then('que gerenciamento de projetos', () => {
    cy.verProjetos();
});

Then('clico em criar novo projeto', () => {
    cy.get(loc.PROJETOS.CRIARPROJETO).click();
});

Then('preencho os dados de um novo projeto', () => {
    const nameProjeto = GerarDados.nomeProjeto();
    cy.wrap(nameProjeto).as("nomeDoProjeto")
    cy.get(loc.PROJETOS.NOMEPROJETO).type(nameProjeto);
});

Then('confirmo a criação', () => {
    cy.get(loc.PROJETOS.BUTTONCRIARPROJETO).click();
});

Then('o projeto deve ser criado e listado corretamente no sistema', () => {
    cy.wait(4000);
    cy.get('@nomeDoProjeto').then((plataforma) => {
        cy.get('a').contains(plataforma);
    });
});

Then('deleto o projeto', () => {
    cy.get('@nomeDoProjeto').then((nameProject) => {
        cy.deletarProjeto(nameProject).then(() => {
            cy.log(`Projeto Deletado: ${nameProject}`);
        });
    });
});

Then('preencho o nome da categoria', () => {
    const nomeCategoria = GerarDados.categoriaName();
    cy.wrap(nomeCategoria).as("nomeCategoriaValido");
    cy.get(loc.CATEGORIA.PREENCHERCATEGORIA).type(nomeCategoria);
});

Then('clico em adicionar categoria', () => {
    cy.get(loc.CATEGORIA.CLICARCATEGORIA).click();
});

Then('verifico se a categoria existe', () => {
    cy.get('@nomeCategoriaValido').then((nameCategoria) => {
        cy.get('td').then(($tds) => {
            const existe = $tds.toArray().some(td => td.innerText.trim() === nameCategoria);
            expect(existe).to.be.true;
        });
    });
});

Then('deleto a categoria', () => {
    cy.get('@nomeCategoriaValido').then((nameCategoria) => {
        cy.deletarCategoria(nameCategoria);
    });
});

Given('tenho uma categoria', () => {
    cy.inserirCategoria().then(() => {
        cy.log(`Categoria Inserida`);
    });
});

Then('clico em apagar', () => {
    cy.retornaCategoria().then((categoria) => {
        cy.wrap(categoria[0]).as("categoriaValida");
    });
    cy.get('@categoriaValida').then((categoria) => {
        cy.contains('td', categoria.name)   
            .parent('tr')                          
            .within(() => {                         
                cy.contains('button', 'Apagar').click();
            });
    })
});

Then('confirmo que desejo apagar', () => {
    cy.get(loc.CATEGORIA.APAGARCATEGORIA).click();
});

Then('verifico que a categoria não existe mais', () => {
    cy.get('@categoriaValida').then((nameCategoria) => {
        cy.get('td').then(($tds) => {
            const existe = $tds.toArray().some(td => td.innerText.trim() === nameCategoria.name);
            expect(existe).to.be.false;
        });
    });
});

Then('clico em editar', () => {
    cy.retornaCategoria().then((categoria) => {
        cy.wrap(categoria[0]).as("categoriaValida");
    });
    cy.get('@categoriaValida').then((categoria) => {
        cy.contains('td', categoria.name)
            .parent('tr')
            .within(() => {
                cy.contains('button', 'Alterar').click();
            });
    })
});

Then('coloco outro nome', () => {
    const nomeNovoCategoria = GerarDados.categoriaNameAlterada();
    cy.get(loc.CATEGORIA.ALTERARCATEGORIA).clear();
    cy.get(loc.CATEGORIA.ALTERARCATEGORIA).type(nomeNovoCategoria);
});

Then('verifico que a categoria mudou nome', () => {
    cy.retornaCategoria().then((categoria) => {
        cy.wrap(categoria[0]).as("categoriaValidaAlterada");
    });
    cy.get('@categoriaValidaAlterada').then((nameCategoria) => {
        cy.get('td').then(($tds) => {
            const existe = $tds.toArray().some(td => td.innerText.trim() === nameCategoria.name);
            expect(existe).to.be.true;
        });
    });
});

Then('deleto a categoria alterada', () => {
    cy.get('@categoriaValidaAlterada').then((nameCategoria) => {
        cy.deletarCategoria(nameCategoria.name);
    });
});

Then('atualizo a categoria', () => {
    cy.get(loc.CATEGORIA.ATUALIZOCATEGORIA).click();
});