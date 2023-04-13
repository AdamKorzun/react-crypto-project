describe('Header', () => {
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

  it('should display top 3 currencies', () => {
    cy.get('[data-testid="top-currencies"]')
      .children('[data-testid="top-currency"]')
      .should('have.length', 3);
  });

  it('should open portfolio modal when "Portfolio" button is clicked', () => {
    cy.get('[data-testid="portfolio-icon"]').first().click();
    cy.get('[data-testid="overlay"]').should('be.visible');
  });

  it('should add a currency to the portfolio when the modal form is submitted', () => {
    cy.get('button').contains('Add').first().click();
    cy.get('input').type('100');
    cy.get('button').contains('Add to portfolio').first().click();
    cy.get('[data-testid="portfolio-value"]').should('have.text', '3M');
  });

  it('should match the snapshot', () => {
    cy.get('header').matchImageSnapshot();
  });
});
