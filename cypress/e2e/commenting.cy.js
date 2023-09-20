describe("Commenting", () => {
  beforeEach(() => {
    cy.visit("/login/index.html");
    cy.login("bezylmophatotieno@gmail.com", "12345");
  });
  it("it should comment successfully", () => {
    cy.get(".commentInput").each((el, index) => {
      if (index === 0) {
        cy.wrap(el).type("This is a comment");
      }
      // choose the first button and click to send the message
      cy.get(".commentBtn").each((el, index) => {
        if (index === 0) {
          cy.wrap(el).click();
        }
      });
    });
    // The count should change in value
    cy.get(".count").each((el, index) => {
      if (index === 0) {
        cy.wrap(el).should("have.text", "10");
      }
    });
  });
});
