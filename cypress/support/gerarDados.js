import { faker } from '@faker-js/faker';

export const GerarDados = {
  nomeUser: () => {
    return faker.person.firstName(); // ✅ novo faker
  },
  fullName: () => {
    return `${faker.person.firstName()} ${faker.person.lastName().replace("'", "")}`;
  },
  email: () => {
    return faker.internet.email();
  },
  numeroAleatorio: () => {
    return Math.floor(Math.random() * 100).toString();
  },
  getRandomString: (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
  nomeProjeto: () => {
    return `Projeto Teste Larissa ${GerarDados.getRandomString(3)}${GerarDados.numeroAleatorio()}`;
  },
  nomeMarcador: () => {
    return `Marcador Teste Larissa ${GerarDados.getRandomString(3)}${GerarDados.numeroAleatorio()}`;
  },
  descricaoTexto: () => {
    return `Descrição Teste Larissa ${GerarDados.getRandomString(20)}`;
  },
  gerarData: () => {
    return Math.floor(Date.now() / 1000).toString();
  },
  nomePlataforma: () => {
    return `Plataforma ${GerarDados.getRandomString(3)}`;
  },
  nomeSO: () => {
    return `Windows ${GerarDados.getRandomString(3)}`;
  },
  nomeVersaoSO: () => {
    return `Versao ${GerarDados.numeroAleatorio()}`;
  },
  sumarioIssue: () => {
    return `Sumario Larissa V${GerarDados.getRandomString(10)}`;
  },
  descricaoTextoModificado: () => {
    return `Descrição Teste Larissa Modificado ${GerarDados.getRandomString(20)}`;
  },
  descricaoAnotacoes: () => {
    return `Anotacoes Teste Larissa ${GerarDados.getRandomString(20)}`;
  },
  descricaoAnotacoesModificado: () => {
    return `Anotacoes Teste Larissa Modificado ${GerarDados.getRandomString(20)}`;
  },
  tagName: () => {
    return `Tag Larissa ${GerarDados.getRandomString(10)}`;
  },
  categoriaName: () => {
    return `Categoria Larissa ${GerarDados.getRandomString(10)}`;
  },

  categoriaNameAlterada: () => {
    return `Categoria Alterada Larissa ${GerarDados.getRandomString(10)}`;
  }
};
