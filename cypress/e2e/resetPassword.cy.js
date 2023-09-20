describe("Reset Password", () => {
  beforeEach(() => {
    cy.visit("login/index.html");
  });
  it("it should navigate to the reset password page", () => {
    cy.get(".reset").click();
    cy.location("pathname").should("eq", "/frontend/reset-paasword/index.html");
  });
  it("should render an email input field and a submit button", () => {
    cy.get(".reset").click();
    cy.get(".email").should("be.visible");
    cy.get(".verify").should("be.visible").and("have.text", "Verify");
    cy;
  });
  it("it should display an alert when the email field is keyed in", () => {
    cy.get(".reset").click();
    cy.get(".email").type("bezylmophatotieno@gmail.com");
    cy.get(".verify").click();
    cy.get(".alert").should("be.visible");
  });
});
