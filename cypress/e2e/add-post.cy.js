describe("", () => {
  beforeEach(() => {
    cy.visit("/login/index.html");
    cy.login("bezylmophatotieno@gmail.com", "12345");
  });
  it("it should create a post without an image or video", () => {
    cy.get(".postInput").type("This is a test post");
    cy.get(".postBtn").click();
    cy.wait(3000);
    cy.get(".postInput").clear();
  });
  it("An alert should be displayed on successfull creation of a post", () => {
    cy.get(".postInput").type("This is a test post1");
    cy.get(".postBtn").click();
    cy.wait(3000);
    cy.get("#alertMessage").should("be.visible");
  });
  it("it should upload an image successfully", () => {
    // Select an image file
    const imageFileName = "image.png";
    cy.fixture(imageFileName).then((fileContent) => {
      cy.get("#imgInput").attachFile({
        fileContent,
        fileName: imageFileName,
        mimeType: "image/png", // Specify the MIME type of the file
      });
    });
    cy.get("#alertMessage").should("exist");
  });
  it("it should upload a video successfully", () => {
    const videoFileName = "video.mp4";
    cy.fixture(videoFileName).then((fileContent) => {
      cy.get("#videoInput").attachFile({
        fileContent,
        fileName: videoFileName,
        mimeType: "video/mp4",
      });
    });
    cy.get("#alertMessage").should("exist");
  });
});
