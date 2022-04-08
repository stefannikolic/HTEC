/// <reference types="Cypress" />
describe("SandBox testing", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Should create new report with image", () => {
    cy.intercept("/api/candidate/create-report/photo").as("image");

    cy.visit("/reports");
    cy.title("QASandbox");

    cy.visit("/reports");

    cy.get(".grid-menu-container .main-grid .btn-primary")
      .should("be.visible")
      .should("have.text", "New Report")
      .click();

    cy.get(".grid-menu-container .main-grid .navigate-left-title").should(
      "have.text",
      "New Report"
    );

    cy.get('.grid-menu-container .default-container [name="summary"]').type(
      "Project data are not deleted"
    );

    cy.get('.grid-menu-container .default-container [name="type"]').select(
      "Bug"
    );

    cy.get('.grid-menu-container .default-container [name="severity"]').select(
      "Medium"
    );

    cy.get('.grid-menu-container .default-container [name="priority"]').select(
      "Critical"
    );

    cy.get('.grid-menu-container .default-container [name="description"]').type(
      "High"
    );

    cy.get(".grid-menu-container .default-container .full-width-btn")
      .should("have.text", "Add Test Step")
      .click()
      .click()
      .click()
      .click();

    cy.get('.grid-menu-container .default-container [name="step-0"]').type(
      "Login"
    );

    cy.get('.grid-menu-container .default-container [name="step-1"]').type(
      "Navigate to Playground and create new project with some data"
    );

    cy.get('.grid-menu-container .default-container [name="step-2"]').type(
      "Remove previously created project"
    );

    cy.get('.grid-menu-container .default-container [name="step-3"]').type(
      "Create new project"
    );
    cy.get('.grid-menu-container .default-container [name="step-4"]')
      .next()
      .click();

    cy.get(
      '.grid-menu-container .default-container [name="expected_result"]'
    ).type("Data from previously created project are displayed");

    cy.get(".grid-menu-container .uploaded .uploaded-button .btn").selectFile(
      "cypress/fixtures/htec.png"
    );
    cy.wait("@image");
    cy.get(".Toastify__toast-container")
      .should("be.visible")
      .should("contain", "Photo successfully uploaded");

    cy.get(".grid-menu-container .default-container .btn-primary")
      .should("be.visible")
      .should("have.text", "Submit")
      .click();

    cy.get(".Toastify__toast-container")
      .should("be.visible")
      .should("contain", "Report created successfully");
  });
});
