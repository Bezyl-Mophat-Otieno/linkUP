describe("searching functionality", () => {
  it("should search for a product and the suggested followers based on the input", () => {
    cy.visit("/login");
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".searchInput-main").type("b");
    cy.get(".searchBtn-main").click();
    cy.get(".container").should("contain", "b");
    cy.get(".posts").should("contain", "b");
  });
});
