const baseUrl = "https://magento.softwaretestingboard.com";
describe.skip("Smoke test", () => {
  it("Check homepage", () => {
    cy.visit(baseUrl);
    cy.get('[href="' + baseUrl + '/customer/account/create/"]').contains(
      "Create an Account"
    );
  });
});

describe("Create an Account", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("register", () => {
    const { firstname, lastname, password } = require("../fixtures/userData");
    const id = Date.now();
    const emailAddress = `${lastname}.${firstname + id}@elie.wcs`;
    cy.contains("Create an Account").click();
    cy.url().should("eq", baseUrl + "/customer/account/create/");
    cy.get("#firstname").type(firstname);
    cy.get("#lastname").type(lastname);
    cy.get("#email_address").type(emailAddress);
    cy.get("#password").type(password);
    cy.get("#password-confirmation").type(password);
    cy.get('[title="Create an Account"]').click();
    cy.log("jusquici tout va bien");
    cy.wait(2000);
    cy.get(".message")
      .should("be.visible")
      .contains("Thank you for registering with Main Website Store.");

    cy.url().should("eq", baseUrl + "/customer/account/");
    cy.get(".page-title").should("be.visible").contains("My Account");
    cy.get(".box-information")
      .should("contain", `${firstname} ${lastname}`)
      .should("contain", emailAddress);
  });
});
