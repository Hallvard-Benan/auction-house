describe("Search functionality", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "api/v1/auction/listings?_bids=true&_seller=true&sort=created&sortOrder=desc&limit=100&offset=*&_active=true"
    ).as("getPosts");
    cy.visit("/");
  });

  const searchTerms = ["cat", "dog", "test"];

  searchTerms.forEach((term) => {
    it(`Allows non registered user to search through listings from homepage for ${term}`, () => {
      cy.get('[data-cy="search"]').should("exist").type(term);
      cy.get('[data-cy="submit-search"]').should("exist").click();
      cy.wait("@getPosts");

      cy.get('[data-cy="card_title"]').each(($el) => {
        const title = $el.text().toLowerCase().replace(/\s+/g, "");
        expect(title).to.include(term);
      });
    });
  });
});
