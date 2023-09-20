describe("Profile Section", () => {
  //   it("should navigate to a profile page", () => {
  //     cy.visit("/login");
  //     cy.login("bezylmophatotieno@gmail.com", "12345");
  //     cy.wait(2000);
  //     cy.get(".profile").click();
  //     cy.wait(2000);
  //     cy.get(".username").should("be.visible");
  //     cy.get(".bio").should("be.visible");
  //     cy.get(".profile-pic").should("be.visible");
  //   });
  it("should change the profile pic successfully", () => {
    cy.visit("/login");
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(2000);
    cy.get(".profile").click();
    // Select an image file
    const imageFileName = "image.png";
    cy.fixture(imageFileName).then((fileContent) => {
      cy.get("#imgInput").attachFile({
        fileContent,
        fileName: imageFileName,
        mimeType: "image/png", // Specify the MIME type of the file
      });
    });
    cy.wait(2000);
    cy.get("#alertMessage")
      .should("exist")
      .should("have.text", "Image Uploaded Successfully");
  });
});
