let exampleData;

before(() => {
  cy.fixture("example").then((data) => {
    exampleData = data;
  });
});

Cypress.Commands.add("login", () => {
  cy.intercept("/api/candidate/login").as("loginApi");

  cy.visit("/login");

  cy.get('input[name="email"]').type(exampleData.login.email);

  cy.get('input[name="password"]').type(exampleData.login.password);

  cy.get(".grid-container button").should("be.visible").click();

  cy.wait("@loginApi");
});

Cypress.Commands.add("loginApi", () => {
  const UserCredentials = {
    email: exampleData.login.email,
    password: exampleData.login.password,
  };

  cy.request(
    "POST",
    "https://qa-sandbox.ni.htec.rs/api/candidate/login",
    UserCredentials
  )
    .its("body")
    .then((body) => {
      const token = body.token;

      cy.wrap(token).as("token");
      cy.visit("baseUrl", {
        onBeforeLoad(win) {
          win.localStorage.setItem("jwtSandboxToken", token);
        },
      });
    });
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
