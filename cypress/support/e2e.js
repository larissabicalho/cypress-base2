// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-file-upload';

// estrategia

require('cypress-xpath');

Cypress.SelectorPlayground.defaults({
    selectorPriority: ['data-wc', 'data-cy', 'data-test', 'data-testid', 'id', 'class', 'attributes', 'tag', 'nth-child']
})


Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora apenas o erro de "charAt" vindo de um valor undefined
  if (
    err.message.includes("charAt") &&
    err.message.includes("Cannot read properties of undefined") &&
    err.stack.includes("bugFilter.js")
  ) {
    return false; // impede que o erro quebre o teste
  }

  // outros erros não são ignorados
  return true;
});
