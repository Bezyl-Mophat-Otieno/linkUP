describe("User Dashboard", () => {
  it("should navigate to the Market Place", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);

    cy.location("pathname").should("eq", "/frontend/market-place/index.html");
  });

  it("Should have products in the dashboard", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
  });
  it("Should have a search bar", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get("#market").click();
    cy.get(".search-bar").should("be.visible");
  });
  it("Should have a logout button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get("#market").click();
    cy.get(".logout").should("be.visible");
  });
  it("it should navigate to my cart page when cart is clicked", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get("#market").click();
    cy.get("#cart").click();
    cy.location("pathname").should(
      "eq",
      "/frontend/market-place/cart/index.html"
    );
  });
  it("should find the cart empty", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get("#market").click();
    cy.get("#cart").click();
    cy.get(".emptyCart").should("be.visible");
  });
  it("it should navigate to my Orders Page clicked", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get("#market").click();

    cy.get(".orders").click();
    cy.location("pathname").should(
      "contain",
      "/frontend/market-place/myOrder/index.html"
    );
  });
});
