// cypress/support/GlobalStaticParameters.js
import { GerarDados } from '../support/gerarDados';

export class GlobalStaticParameters {
 // 🔹 Parâmetros fixos
 static file_path = "/temp";
 static userPadrao = "administrator";
 static user = "teste@gmail.com";
 static userComCaracterEspecial = "la&*#!@gmail.com";
 static senha = "1233";
 static mensagemErroUsuario = "APPLICATION ERROR #805";
 static mensagemErroEmail = "Sua conta pode estar desativada ou bloqueada ou o nome de usuário e a senha que você digitou não estão corretos.";
 static filtroResolvido = "resolvido";
 static filtroUrgente = "urgente";
 static acao = "Fechar";
 static fechado = "fechado";
 static csv = "C:\\Users\\larissaBicalho\\Downloads\\administrator.csv";
 static doc = "C:\\Users\\larissaBicalho\\Downloads\\administrator.doc";
 static xml = "C:\\Users\\larissaBicalho\\Downloads\\administrator.xml";
 static attachment = "src/test/java/com/javaseleniumtemplate/utils";
 static file = "teste.txt";
 // 🔹 Parâmetros dinâmicos → agora são funções
 static description() {
   return `Descricao ${GerarDados.numeroAleatorio()}`;
 }
 static descriptionRandom() {
   return `Descricao ${GerarDados.getRandomString(10)}`;
 }
 static dynamicProjectName() {
   return `Projeto ${GerarDados.getRandomString(5)}`;
 }
}