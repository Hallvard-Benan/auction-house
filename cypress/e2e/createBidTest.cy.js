describe("bid functionality", () => {
  let listingId;
  beforeEach(() => {
    cy.intercept("POST", "/api/v1/auction/auth/login").as("loginRequest");
    cy.intercept(
      "/api/v1/auction/listings?_bids=true&_seller=true&sort=created&sortOrder=desc&limit=100&offset=0&_active=true"
    ).as("listingsRequest");
    cy.visit("/");
    cy.get('[data-cy="open-login-form"]').click();
    cy.fixture("login-data.json").then((loginData) => {
      const user = loginData.registeredUsers[0];
      cy.get('[data-cy="email"]').type(user.email);
      cy.get('[data-cy="password"]').type(user.password);
      cy.get('[data-cy="submit-login"]').click();
      cy.wait("@loginRequest");
      cy.wait("@listingsRequest");
      cy.get('[data-cy^="no_bids_"]')
        .first()
        .invoke("attr", "data-cy")
        .then((value) => {
          listingId = value.split("_").pop();
          cy.wrap(listingId).as("listingId");
          cy.intercept(
            "POST",
            `/api/v1/auction/listings/${listingId}/bids?_seller=true&_bids=true`
          ).as("addBid");
          cy.intercept(
            "GET",
            `/api/v1/auction/listings/${listingId}?_bids=true&_seller=true`
          ).as("getListing");
        });
    });
  });

  it("logged in user can bid on a listing", () => {
    cy.get('[data-cy^="no_bids_"]').first().click();

    cy.wait("@getListing");

    cy.get('[data-cy="bidInput"]').should("exist").type(1);
    cy.get('[data-cy="bidSubmit"]').should("exist").click();
    cy.wait("@getListing");

    cy.get('[data-cy="bidTab"]').click();
    cy.get('[data-cy="bid-1"]').should("exist");
  });
});
