describe('Alura search courses', () => {
  beforeEach(() => {
    cy.visit('https://alura.com.br');
  });

  it('search java course', () => {
    cy.get('#header-barraBusca-form-campoBusca').type('java');
    cy.get('.header-barraBusca-form-submit').click();
    cy.get('h4.busca-resultado-nome').should(
      'contain',
      'Formação Aprenda Java com Orientação a Objetos'
    );
  });
});
