describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/v2/assets/?limit=3&offset=*', {
      fixture: 'topCurrencies.json',
    }).as('fetchTopCurrencies');
    cy.intercept('GET', '/v2/assets/?limit=15&offset=*', {
      fixture: 'currencies.json',
    }).as('fetchCurrencies');
    cy.intercept('GET', '/v2/assets/?ids=*', {
      fixture: 'currencies.json',
    }).as('addedCurrencies');
    cy.visit('/');
    cy.wait('@fetchTopCurrencies');
    cy.wait('@fetchCurrencies');
    cy.wait('@addedCurrencies');
  });

  it('should display a table with currency data', () => {
    cy.get('[data-testid="table"]').should('be.visible');
  });

  it('should navigate to the currency detail page when a row is clicked', () => {
    cy.get('[data-testid="table-row"]').first().click();
    cy.url().should('include', '/currency/');
  });

  it('should navigate back to the home page when back button is clicked', () => {
    cy.get('[data-testid="table-row"]').first().click();
    cy.go(-1);
    cy.url().should('eq', Cypress.config('baseUrl'));
  });

  it('should open the add currency modal when the "Add" button is clicked', () => {
    cy.get('[data-testid="add-currency-button"]').first().click();
    cy.get('[data-testid="overlay"]').should('be.visible');
  });

  it('should add a currency to the portfolio when the modal form is submitted', () => {
    cy.get('[data-testid="add-currency-button"]').first().click();

    cy.get('[data-testid="amount-input"]').type('100');
    cy.get('[data-testid="submit-form-button"]').first().click();
    // Verify that the currency was added to the portfolio
    cy.get('[data-testid="portfolio-icon"]').click();

    cy.get('[data-testid="portfolio-row"')
      .contains('Bitcoin')
      .parent('[data-testid="portfolio-row"]')
      .within(() => {
        // Find the cell containing the currency amount using the data-testid attribute
        cy.get('[data-testid="currency-amount"]').should('have.text', '100');
      });
  });

  it('should load more currencies when the "Load more" button is clicked', () => {
    cy.get('[data-testid="table-row"]').should('have.length', 15);
    cy.get('[data-testid="load-more-button"]').click();
    cy.get('[data-testid="table-row"]').should('have.length', 30);
  });

  it('should match the snapshot', () => {
    cy.matchImageSnapshot();
  });
});
