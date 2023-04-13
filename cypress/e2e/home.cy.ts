describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/v2/assets/?limit=15&offset=*', {
      fixture: 'currencies.json',
    }).as('fetchCurrencies');
    cy.visit('/');
    cy.wait('@fetchCurrencies');
  });

  it('should display a table with currency data', () => {
    cy.get('table').should('be.visible');
  });

  it('should navigate to the currency detail page when a row is clicked', () => {
    cy.get('table tbody tr').first().click();
    cy.url().should('include', '/currency/');
  });

  it('should navigate back to the home page when back button is clicked', () => {
    cy.get('table tbody tr').first().click();
    cy.go(-1);
    cy.url().should('eq', Cypress.config('baseUrl'));
  });

  it('should open the add currency modal when the "Add" button is clicked', () => {
    cy.get('button').contains('Add').first().click();
    cy.get('[data-testid="overlay"]').should('be.visible');
  });

  it('should add a currency to the portfolio when the modal form is submitted', () => {
    cy.get('button').contains('Add').first().click();

    cy.get('input').type('100');
    cy.get('button').contains('Add to portfolio').first().click();
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

  it('should load more currencies when the "Load more" button is clicked', () => {
    cy.get('table tbody tr').should('have.length', 15);
    cy.contains('Load more').click();
    cy.get('table tbody tr').should('have.length', 30);
  });
});
