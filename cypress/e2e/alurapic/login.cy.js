describe('User login at Alura Pic', () => {
  beforeEach(() => {
    cy.visit('https://alura-fotos.herokuapp.com');
  });

  it('Login with a valid user', () => {
    cy.login(Cypress.env().userName, Cypress.env().password);
    cy.contains('a', '(Logout)').should('be.visible');
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
});
