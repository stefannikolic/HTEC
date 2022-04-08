/// <reference types="Cypress" />
describe("Should check the form in respect of Boundary Value Analysis for Seniority, Technology or People (API)", () => {
  beforeEach(() => {
    cy.loginApi();
  });

  it("Should check boundary value for Seniority", () => {
    cy.get("@token").then((token) => {
      cy.request({
        method: "POST",
        url: "https://qa-sandbox.ni.htec.rs/api/candidate/seniorities",
        headers: {
          authorization: "Bearer " + token,
        },
        body: {
          title: "Senior Senior Senior Senior Senior Senior Senior Se",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body).has.property(
          "seniority",
          "Title can not have more than 50 character (51)"
        );
      });

      cy.request({
        method: "POST",
        url: "https://qa-sandbox.ni.htec.rs/api/candidate/seniorities",
        headers: {
          authorization: "Bearer " + token,
        },
        body: {
          title: "",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body).has.property("seniority", "Title is required");
      });

      cy.request({
        method: "POST",
        url: "https://qa-sandbox.ni.htec.rs/api/candidate/seniorities",
        headers: {
          authorization: "Bearer " + token,
        },
        body: {
          title: "Senior Senior Senior Senior Senior Senior Senior S",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body).to.be.a(
          "array",
          "Senior Senior Senior Senior Senior Senior Senior S"
        );
      });
    });
  });

  it("Should check boundary value for Technology", () => {
    cy.get("@token").then((token) => {
      cy.request({
        method: "POST",
        url: "https://qa-sandbox.ni.htec.rs/api/candidate/technologies",
        headers: {
          authorization: "Bearer " + token,
        },
        body: {
          title: "JavaScript JavaScript JavaScript JavaScript JavaScr",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body).has.property(
          "technology",
          "Title can not have more than 50 character (51)"
        );
      });

      cy.request({
        method: "POST",
        url: "https://qa-sandbox.ni.htec.rs/api/candidate/technologies",
        headers: {
          authorization: "Bearer " + token,
        },
        body: {
          title: "",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body).has.property("technology", "Title is required");
      });

      cy.request({
        method: "POST",
        url: "https://qa-sandbox.ni.htec.rs/api/candidate/technologies",
        headers: {
          authorization: "Bearer " + token,
        },
        body: {
          title: "JavaScript JavaScript JavaScript JavaScript JavaSc",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body).to.be.a(
          "array",
          "JavaScript JavaScript JavaScript JavaScript JavaSc"
        );
      });
    });
  });

  it("Should check boundary value for People", () => {
    cy.get("@token").then((token) => {
      cy.request({
        method: "POST",
        url: "https://qa-sandbox.ni.htec.rs/api/candidate/people",
        headers: {
          authorization: "Bearer " + token,
        },
        body: {
          name: "Stefan Stefan Stefan Stefan Stefan Stefan Stefan St",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body).has.property(
          "name",
          "Name can not have more than 50 character (51)"
        );
      });

      cy.request({
        method: "POST",
        url: "https://qa-sandbox.ni.htec.rs/api/candidate/people",
        headers: {
          authorization: "Bearer " + token,
        },
        body: {
          title: "",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body).has.property("name", "Name is required");
      });

      cy.request({
        method: "POST",
        url: "https://qa-sandbox.ni.htec.rs/api/candidate/people",
        headers: {
          authorization: "Bearer " + token,
        },
        body: {
          name: "Stefan Stefan Stefan Stefan Stefan Stefan Stefan S",
          technologies: [],
          seniority: [],
          team: [],
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.body).to.be.a(
          "array",
          "Stefan Stefan Stefan Stefan Stefan Stefan Stefan S"
        );
      });
    });
  });
});
