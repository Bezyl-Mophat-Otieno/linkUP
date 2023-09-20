describe("Single Post", () => {
  it("should navigate to a single post page", () => {
    cy.visit("/login");
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".content-link").each((el, index) => {
      if (index === 0) {
        cy.wrap(el).click();
      }
    });

    cy.location("href").should("contain", "id");
  });
});
