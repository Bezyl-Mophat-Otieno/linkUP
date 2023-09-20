describe("Follow a user", () => {
  beforeEach(() => {
    cy.visit("/login/index.html");
    cy.login("bezylmophatotieno@gmail.com", "12345");
  });
  it("should follow a user", () => {
    // it follow a user and alertMessage should have content Followed Successfully
    cy.get(".toFollow").each((el, index) => {
      if (index === 0) {
        cy.wrap(el).click();
      }
    });
    cy.get("#alertMessage").should("have.text", "User followed successfully");
  });
});
