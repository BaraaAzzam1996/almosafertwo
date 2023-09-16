describe('filtering from the lowest to highest price', () => {
  it('search for hotel select the first one and filtering the results', () => {
    cy.visit('https://www.almosafer.com/en');
    cy.get('.cta__saudi').click();
    cy.get('#uncontrolled-tab-example-tab-hotels').click();
    let countries = ['dubai', 'jeddah', 'amman'];
    let randomIndex = Math.floor(Math.random() * countries.length);
    let randomCountry = countries[randomIndex];

    cy.get('[data-testid="AutoCompleteInput"]').type(randomCountry);
    cy.get('[data-testid="AutoCompleteResultsList"]')
      .find("li")
      .eq(1)
      .click();

    cy.get('[data-testid="HotelSearchBox__SearchButton"]').click().wait(20000);
    cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click();
    cy.get('.Price__Value')
      .first()
      .invoke('text')
      .then((firstPrice) => {
        cy.get('.Price__Value')
          .last()
          .invoke('text')
          .then((lastPrice) => {
            const firstPriceValue = parseFloat(firstPrice);
            const lastPriceValue = parseFloat(lastPrice);
            expect(firstPriceValue).to.be.lessThan(lastPriceValue);
          });
      });
  });
});
