describe('Currency Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/v2/assets/bitcoin', {
      fixture: 'bitcoin.json',
    }).as('fetchCurrency');
    cy.intercept('GET', 'v2/assets/bitcoin/history?interval=d1', {
      fixture: 'historic.json',
    }).as('fetchHistoricData');

    cy.visit('/currency/bitcoin');

    cy.wait('@fetchCurrency');
    cy.wait('@fetchHistoricData');
  });

  it('should display chart', () => {
    cy.get('.recharts-surface').should('be.visible');
  });

  it('should add a currency to the portfolio when the modal form is submitted', () => {
    cy.get('button').contains('Add').first().click();

    cy.get('input').type('100');
    cy.get('[data-testid="overlay"]')
      .contains('Add to portfolio')
      .click({ force: true });
    // Verify that the currency was added to the portfolio
    cy.get('[data-testid="portfolio-icon"]').click();
    cy.get('tr')
      .contains('Bitcoin')
      .parent('tr')
      .within(() => {
        // Find the cell containing the currency amount using the data-testid attribute
        cy.get('[data-testid="currency-amount"]').should('have.text', '100');
      });
  });

  it('should match the snapshot', () => {
    cy.matchImageSnapshot();
  });
});
