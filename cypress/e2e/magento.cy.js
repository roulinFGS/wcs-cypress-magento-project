const baseUrl = "https://magento.softwaretestingboard.com";

describe("Majento tests suite", () => {
  it("Register successfully", () => {
    cy.visit(baseUrl);
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

  it.only("Sign in successfully", () => {
    // Connection to shop
    cy.visit(baseUrl);


    const user = require("../fixtures/userData");
    const signUrl = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';

    const { password, emailAddress, address1, city } = require("../fixtures/userData").existingUser;
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

    const saleUrl = 'https://magento.softwaretestingboard.com/sale.html';
    const bagsUrl = 'https://magento.softwaretestingboard.com/gear/bags.html';

    cy.get(`[href="${saleUrl}"]`).contains('Sale').click();

    // Assertion for success
    cy.url().should("eq", saleUrl);

    // click on bags link
    cy.get(`.sidebar-main a[href="${bagsUrl}"]`).click();

    // Assertion for success
    cy.url().should("eq", bagsUrl);

    // ça va plaire à Roland ^^
    cy.get('ol.product-items li:first').click();

    // Assertion for success
    cy.url().should("eq", "https://magento.softwaretestingboard.com/push-it-messenger-bag.html");

    // Wait for js magic to enable
    cy.wait(1000);

    // Add to cart
    cy.get('#product-addtocart-button').click();

    // check message you added
    cy.get('[data-ui-id="message-success"]').should("contain", "You added Push It Messenger Bag to your shopping cart.");

    // click on mini cart
    // cy.get('[href="https://magento.softwaretestingboard.com/checkout/cart/"]').click();
    cy.get('.showcart').click();

    // Wait for js magic to enable
    cy.wait(1000);

    // click on checkout
    cy.get("#top-cart-btn-checkout").click();

    // check page is correct
    cy.url().should("contain", "https://magento.softwaretestingboard.com/checkout");

    // fill in info

    // skipping name surname and company

    // street address (skipping lines 2 and 3)
    cy.get("label.label").find("div").contains("Street Address: Line 1").next().find("input").type(address1);    

    // City
    cy.get("label.label").find("City").next().find("input").type(city);
    

    // check message Thank you...

  });
});
