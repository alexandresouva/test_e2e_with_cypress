describe('User register at Alura Pic', () => {
  const users = require('../../fixtures/users.json');

  beforeEach(() => {
    cy.visit('/');
  });

  it('Check for a message indicating required fields', () => {
    cy.contains('a', 'Register now').click();
    cy.get('input[formcontrolname="email"]').blur();
    cy.contains('button', 'Register').click();

    cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
    cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
    cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
    cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
  });

  it('Check for an error message: name length is less than 2', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="fullName"]').type('a').blur();
    cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
  });

  it('Check for an error message: username length is less than 2', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="userName"]').type('a').blur();
    cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
  });

  it('Check for an error message: password length is less than 8', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="password"]').type('alexe').blur();
    cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
  });

  it('Check for an error message: name must be lower case', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="userName"]').type('Ale').blur();
    cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
  });

  it('Checks invalid e-mail message', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="email"]').type('alexandre');
    cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
  });

  users.forEach((user) => {
    it(`Register new user: ${user.userName} `, () => {
      cy.contains('a', 'Register now').click();
      cy.contains('button', 'Register').click();
      cy.get('input[formcontrolname="email"]').type(user.email);
      cy.get('input[formcontrolname="fullName"]').type(user.fullName);
      cy.get('input[formcontrolname="userName"]').type(user.userName);
      cy.get('input[formcontrolname="password"]').type(user.password, {
        log: false,
      });
      cy.contains('button', 'Register').click();
    });
  });
});
