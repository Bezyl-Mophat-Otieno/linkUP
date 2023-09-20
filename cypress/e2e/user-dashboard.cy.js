describe("Navigate to the user dashboard", () => {
  beforeEach(() => {
    cy.visit("login/index.html");
  });
  it("it should navigate to the user dashboard", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.location("pathname").should("eq", "/frontend/user-dashboard/index.html");
  });
  it("it should have the right navbar , left navbar  and the content , search input  , post input , post send video upload , pic upload ", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
  });
  it("it should load the page and render posts from my followers when we click the home button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345"),
      cy.wait(3000),
      cy.get(".home-menu").click(),
      cy
        .location("pathname")
        .should("eq", "/frontend/user-dashboard/index.html");
  });
  it("it should load the page and render my posts when we click the my posts button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345"),
      cy.wait(3000),
      cy.get(".posts-menu").click(),
      cy
        .location("pathname")
        .should("eq", "/frontend/user-dashboard/index.html");
  });
  it("it should load the page and render random posts from the system when we click the explore  button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345"),
      cy.wait(3000),
      cy.get(".explore-menu").click();
    cy.location("pathname").should("eq", "/frontend/user-dashboard/index.html");
  });
  it("it should navigate to market page when we click the market button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345"),
      cy.wait(3000),
      cy.get("#market").click(),
      cy.location("pathname").should("eq", "/frontend/market-place/index.html");
  });
  it("it should navigate to our profile page if we click the profile link", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345"),
      cy.wait(3000),
      cy.get(".profile").click(),
      cy.location("pathname").should("eq", "/frontend/profile/index.html");
  });
  it("it should navigate to product adding page when we click the add product button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345"),
      cy.wait(3000),
      cy.get(".add-product").click();
    cy.location("pathname").should("eq", "/frontend/add-product/index.html");
  });
  it("it should log out the user when we click the logout button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get("#logout").click();
    cy.location("pathname").should("eq", "/frontend/login/index.html");
  });
});
