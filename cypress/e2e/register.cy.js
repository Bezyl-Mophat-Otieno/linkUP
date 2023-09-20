describe("Register", () => {
  it("Should Navigate to the register page", () => {
    cy.visit("/register");
  });
  it("It should register a user", () => {
    cy.register("john@gmail.com", "John", "12345", "12345");
  });
  it("An alert should be visible", () => {
    cy.register("joh@gmail.com", "John", "12345", "12345");
    cy.wait(2000);
    cy.get(".alert").should("be.visible");
  });
  it("The alert should disappear after 3 seconds", () => {
    cy.register("jo@gmail.com", "John", "12345", "12345");
    cy.wait(4000);
    cy.get(".alert").should("not.exist");
  });
  it("it should navigate to the login page", () => {
    cy.register("j2024@gmail.com", "j", "12345", "12345");
    cy.location("pathname").should("eq", "/frontend/login/index.html");
  });
  it("should");
});
