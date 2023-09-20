describe("Liking  a Post ", () => {
  it("it should like the post and increase the count successfully", () => {
    cy.visit("/login/index.html");
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".like").each((el, index) => {
      if (index === 0) {
        cy.wrap(el).click();
      }
      cy.wait(3000);
      cy.get(".likeCount").each((el, index) => {
        if (index === 0) {
          cy.wrap(el).should("have.text", "9");
        }
      });
    });
  });
});
