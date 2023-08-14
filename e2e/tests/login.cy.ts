/// <reference types="cypress" />
import { usernameInput, passwordInput, formSubmit } from '../cypress/selectors/login'

describe('Login', () => {
  it('should redirect to the collection page on successfull login', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
    usernameInput().clear().type('test');
    passwordInput().clear().type('ngrx');
    formSubmit().click();
    cy.url().should('include', '/books');
  });
})
