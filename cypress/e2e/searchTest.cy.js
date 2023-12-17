describe("Search functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Allows non registered user to search through listings", () => {
    cy.get('[data-cy="search"]').should("exist").type("dog");
    cy.get('[data-cy="submit-search"]').should("exist").click();
  });
});
