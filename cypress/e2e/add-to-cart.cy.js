describe("Add To Cart", () => {
  it("should should click on the add to cart", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".action-btn").first().click();
  });

  it("An alert should show app with text added to cart ", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".action-btn").first().click();
    cy.wait(2000);
    cy.get(".alert").should("be.visible");
  });

  it("The alert should disappear after 3 seconds", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".action-btn").first().click();
    cy.wait(3000);
    cy.get(".alert").should("not.exist");
  });
  it("The cart should have the list of products added to cart", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".action-btn").first().click();
    cy.wait(2000);
    cy.get("#cart").click();
    cy.get(".productContainer").find(".product").should("have.length.gt", 0);
  });
  it("The cart page should have the total cost and the payment methods", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".action-btn").first().click();
    cy.wait(2000);
    cy.get("#cart").click();
    cy.get(".container").find(".total-text").should("be.visible");
    cy.get(".container").find(".checkout-btn").should("be.visible");
  });
  it("It should remove the product from the cart when the remove button is clicked", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".action-btn").first().click();
    cy.wait(2000);
    cy.get("#cart").click();
    cy.get(".productContainer").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".remove-btn").click();
    cy.get(".productContainer").find(".product").should("not.exist");
  });

  it("on check out a success alert should appear", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".action-btn").first().click();
    cy.wait(2000);
    cy.get("#cart").click();
    cy.get(".container").find(".checkout-btn").click();
    cy.get(".alert").should("be.visible");
  });
  it("The  alert should disappear after 3 seconds", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".action-btn").first().click();
    cy.wait(2000);
    cy.get("#cart").click();
    cy.get(".container").find(".checkout-btn").click();
    cy.wait(4000);
    cy.get(".alert").should("not.exist");
  });
  it("The cart should be cleared after checkout ", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#market").click();
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").find(".action-btn").first().click();
    cy.wait(2000);
    cy.get("#cart").click();
    cy.get(".container").find(".checkout-btn").click();
    cy.wait(3000);
    cy.get(".emptyCart").should("be.visible");
  });
});
