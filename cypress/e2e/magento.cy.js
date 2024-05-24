const baseUrl = "https://magento.softwaretestingboard.com";

describe.skip("Smoke test", () => {
  it("Check homepage", () => {
    cy.visit(baseUrl);
    cy.get('[href="' + baseUrl + '/customer/account/create/"]').contains(
      "Create an Account"
    );
  });
});

describe.skip("Create an Account", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("register", () => {
    const { firstname, lastname, password, emailAddress } = require("../fixtures/userData").newUser;

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

describe("Sign In", () => {
  beforeEach(() => {
    cy.visit(baseUrl);

    const user = require("../fixtures/userData");
    cy.log("user", user);
  });

  it("Sign in successfully", () => {
    const signUrl = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';

    const { password, emailAddress } = require("../fixtures/userData").existingUser;
    cy.get(`[href="${signUrl}"]`).contains(' Sign In ').click();
    cy.url().should("eq", signUrl);

    // Fill email field
    cy.get('#email').type(emailAddress);
    // Fill password field
    cy.get('#pass').type(password);

    // Button submit for sign in
    cy.get('#send2').click();

    cy.wait(2000);
    // Assertion for success
    cy.url().should("eq", baseUrl + '/'); // TODO find how handle optionnal trailing slashes in url checks
  });
});