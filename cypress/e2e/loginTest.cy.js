const registeredUser = Cypress.env();
describe("Login functionality", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/v1/auction/auth/login").as("loginRequest");
    cy.visit("/");
    cy.get('[data-cy="open-login-form"]').click();
  });

  it("Logs in a registered user", () => {
    cy.get('[data-cy="email"]').type(registeredUser.email);
    cy.get('[data-cy="password"]').type(registeredUser.password);
    cy.get('[data-cy="submit-login"]').click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      cy.get('[data-cy="open-menu-button"]').should("exist");
    });
  });

  it("Responds with an error if user has wrong credentials", () => {
    cy.get('[data-cy="email"]').type(registeredUser.email);
    cy.get('[data-cy="password"]').type("Incorrect password");
    cy.get('[data-cy="submit-login"]').click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
      cy.get('[data-cy="open-menu-button"]').should("not.exist");
      cy.get('[data-cy="login-error-response"]').should("exist");
    });
  });

  it("Does not allow user to submit with incorrectly formatted password", () => {
    cy.get('[data-cy="email"]').type(registeredUser.email);
    cy.get('[data-cy="password"]').type("1234567");
    cy.get('[data-cy="submit-login"]').should("be.disabled");
    cy.get("@loginRequest.all").should("have.length", 0);
  });

  it("Does not allow user to submit with incorrectly formatted email", () => {
    cy.get('[data-cy="email"]').type("email");
    cy.get('[data-cy="password"]').type("12345678");
    cy.get('[data-cy="submit-login"]').should("be.disabled");
    cy.get("@loginRequest.all").should("have.length", 0);
  });
});
