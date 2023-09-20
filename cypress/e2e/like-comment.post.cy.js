describe("Like a comment", () => {
  it("should like a comment and increase the count successfully", () => {
    cy.visit("/login");
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".content-link").each((el, index) => {
      if (index === 0) {
        cy.wrap(el).click();
      }
    });

    cy.wait(2000);
    cy.get(".commentBtn").click();
    cy.get(".comment").each((el, index) => {
      if (index === 0) {
        cy.get(".like").each((el, index) => {
          if (index === 0) {
            cy.wrap(el).click();
          }
        });
      }
    });

    cy.get("#alertMessage").should("exist");
  });
});
