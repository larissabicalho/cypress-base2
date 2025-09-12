import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GlobalStaticParameters } from '../../globalParameters.js';
import loc from '../../locators';

Then('clico em esqueci a senha', () =>{
    cy.get(loc.RESET.ESQUECISENHA).click();
});

 Then('preencho o email do reset', () => {
  cy.buscarAdmin().then((res) => {
  const email = res[0].email;
   cy.get(loc.RESET.PREENCHEREMAIL).type(email);  
    });
 });

 Then('clico em enviar', ()=>{
  cy.get(loc.RESET.ENVIAR).click();
 });