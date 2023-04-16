describe('Receive photos data from API', () => {
  it('Check if photo request was success', () => {
    cy.request({
      method: 'GET',
      url: 'https://apialurapic.herokuapp.com/flavio/photos',
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).is.not.empty;
      expect(res.body[0]).to.have.property('description');
      expect(res.body[0].description).to.have.equal('Farol iluminado');
    });
  });

  it('Check if login was success', () => {
    cy.request({
      method: 'POST',
      url: 'https://apialurapic.herokuapp.com/user/login',
      body: Cypress.env(),
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).is.not.empty;

      expect(res.body).to.have.property('id');
      expect(res.body.id).to.have.equal(1);

      expect(res.body).to.have.property('email');
      expect(res.body.email).to.have.equal('flavio@alurapic.com.br');
    });
  });
});
