describe("Display post comments", () => {
  it("should display post comments", () => {
    cy.visit("/login");
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".content-link").each((el, index) => {
      if (index === 0) {
        cy.wrap(el).click();
      }
    });

    cy.wait(2000);
    cy.get(".commentBtn").click();
    cy.get(".comment").should("be.visible");
  });
});
