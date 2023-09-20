describe("Testing the Add Product Page", () => {
  it("It should navigate to user dashboard", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
  });

  it("Should have a logout button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get("#logout").should("be.visible");
  });
  it("Should have products", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".add-product").click();
    cy.wait(2000);
    cy.get(".product-container").find(".product").should("have.length.gt", 0);
  });
  it("For each product we should have a delete button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".product-container .product:first-child .action-btn-delete").should(
      "exist"
    );
  });
  it("It should make sure we have the update button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".product-container .product:first-child .action-btn-update").should(
      "be.visible"
    );
  });
  it("It should delete the product successfully and it should not exist", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(4000);
    cy.get(
      ".product-container .product:first-child .action-btn-delete"
    ).click();
    cy.wait(4000);
    cy.get(".product-container .product:first-child").should("not.exist");
  });

  it("On delete the products should reduce in number", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".product-container .product").its("length").as("initialLength");
    cy.get(
      ".product-container .product:first-child .action-btn-delete"
    ).click();
    // cy.wait(7000);
    cy.get("@initialLength")
      .wait(7000)
      .should((initialLength) => {
        cy.get(".product-container .product").should(
          "have.length",
          initialLength - 1
        );
      });
  });
  it("should populate the product form when update button is clicked", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(4000);
    cy.get(
      ".product-container .product:first-child .action-btn-update"
    ).click();
    cy.wait(4000);
    cy.get(".productName").should("not.have.value", "");
    cy.get(".productPrice").should("not.have.value", "");
    cy.get(".productDesc").should("not.have.value", "");
    cy.get(".quantity").should("not.have.value", "");
    cy.get(".add-btn").should("contain", "Update Product");
  });
  it("Should show an alert that will disappear after 3seconds", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(4000);
    cy.get(
      ".product-container .product:first-child .action-btn-update"
    ).click();
    cy.wait(4000);
    cy.get(".form-container").find(".add-btn").click();
    cy.wait(4000);
    cy.get(".alert").should("be.visible");
    cy.wait(4000);
    cy.get(".alert").should("not.exist");
  });
  it("it should make sure the image selector can be clickable", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    const image = "frontend/assets/images/Black.png";
    cy.wait(4000);

    cy.get("#image").selectFile(image);
  });
  it("It should clear the form when the update button is clicked", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(4000);
    cy.get(
      ".product-container .product:first-child .action-btn-update"
    ).click();
    cy.wait(4000);
    cy.get(".form-container").find(".add-btn").click();
    cy.wait(4000);
    cy.get(".productName").should("have.value", "");
    cy.get(".productPrice").should("have.value", "");
    cy.get(".productDesc").should("have.value", "");
    cy.get(".quantity").should("have.value", "");
    cy.get(".add-btn").should("contain", "Add Product");
  });

  it("should navigate to orders page when orders button is clicked", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".orders").click();
    cy.wait(2000);
    cy.location("pathname").should("contain", "/frontend/orders/index.html");
  });
});
