describe('Login and user register at Alura Pic ', () => {
  const users = require('../../fixtures/users.json');

  beforeEach(() => {
    cy.visit('https://alura-fotos.herokuapp.com');
  });

  it('Check if is has validation message', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Email is required!').should('be.visible');

    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
    cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
    cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
    cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
  });

  it('Check if it is a valid e-mail', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="email"]').type('alexandre');
    cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
  });

  it('Check if full name length is less than 2', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="fullName"]').type('a').blur();
    cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
  });

  it('Check if user name length is less than 2', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="userName"]').type('a').blur();
    cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
  });

  it('Check if user name has uppercase', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="userName"]').type('Ale').blur();
    cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
  });

  it('Check if user name length is less than 8', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.get('input[formcontrolname="password"]').type('alexe').blur();
    cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
  });

  it('Login with a invalid user', () => {
    cy.login('alexandre', '1234');

    cy.window().then((str) => {
      cy.stub(str, 'alert').as('alert');
    });

    cy.get('@alert').should(
      'have.been.calledOnceWith',
      'Invalid user name or password'
    );
  });

  it('Login with a valid user', () => {
    cy.login('flavio', '123');
    cy.contains('a', '(Logout)').should('be.visible');
  });

  users.forEach((user) => {
    it(`Register new user: ${user.userName} `, () => {
      cy.contains('a', 'Register now').click();
      cy.contains('button', 'Register').click();
      cy.get('input[formcontrolname="email"]').type(user.email);
      cy.get('input[formcontrolname="fullName"]').type(user.fullName);
      cy.get('input[formcontrolname="userName"]').type(user.userName);
      cy.get('input[formcontrolname="password"]').type(user.password);
      cy.contains('button', 'Register').click();
    });
  });
});
