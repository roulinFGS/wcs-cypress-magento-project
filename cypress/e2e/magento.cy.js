const { password, emailAddress, firstname, lastname, address1, city, zip, phone, CountryCode } = require("../fixtures/userData").newUser;
import { baseUrl, signupUrl, signinUrl, accountUrl, saleUrl, bagsUrl, addToCartUrl, checkoutUrl, paymentUrl } from "../fixtures/urls";

describe("Majento tests suite", () => {
  it("Register successfully", () => {
    cy.visit(baseUrl);
    cy.contains("Create an Account").click();
    cy.url().should("contain", signupUrl);
    cy.get("#firstname").type(firstname);
    cy.get("#lastname").type(lastname);
    cy.get("#email_address").type(emailAddress);
    cy.get("#password").type(password);
    cy.get("#password-confirmation").type(password);
    cy.get('[title="Create an Account"]').click();
    cy.wait(2000);
    cy.get(".message")
      .should("be.visible")
      .contains("Thank you for registering with Main Website Store.");

    cy.url().should("contain", accountUrl);
    cy.get(".page-title").should("be.visible").contains("My Account");
    cy.get(".box-information")
      .should("contain", `${firstname} ${lastname}`)
      .should("contain", emailAddress);
  });

  it("Sign in successfully", () => {
    // Connection to shop
    cy.visit(signinUrl);
    cy.wait(2000);

    cy.url().should("contain", signinUrl);

    // Fill email field
    cy.get('#email').type(emailAddress);
    // Fill password field
    cy.get('#pass').type(password);

    // Button submit for sign in
    cy.get("#login-form").submit();
    cy.wait(2000);

    // Assertion for success
    cy.url().should("contain", accountUrl);

    cy.get(`[href="${saleUrl}.html"]`).contains('Sale').click();

    // Assertion for success
    cy.url().should("contain", saleUrl);

    // click on bags link
    cy.get(`.sidebar-main a[href="${bagsUrl}.html"]`).click();

    // Assertion for success
    cy.url().should("contain", bagsUrl);

    // selcet one product
    cy.get('ol.product-items li:first').click();

    // Assertion for success
    cy.url().should("contain", addToCartUrl);

    // Wait for js magic to enable
    cy.wait(5000);

    // Add to cart
    cy.get('#product-addtocart-button').click();

    // check message you added
    cy.get('[data-ui-id="message-success"]').should("contain", "You added Push It Messenger Bag to your shopping cart.");

    // click on mini cart
    cy.get('.showcart').click();

    // Wait for js magic to enable
    cy.wait(2000);

    // click on checkout
    cy.get("#top-cart-btn-checkout").click();
    cy.wait(7000);

    // check page is correct
    cy.url().should("contain", checkoutUrl);
    cy.wait(1000);

    // fill in info

    // skipping name surname and company

    // street address (skipping lines 2 and 3)
    cy.get('input[name="street[0]"]').type(address1);

    // City
    cy.get('input[name="city"]').type(city);   

    // ZIP
    cy.get('input[name="postcode"]').type(zip);

    // Phone number
    cy.get('input[name="telephone"]').type(phone);

    // country avant province
    cy.get('select[name="country_id"]').select(CountryCode);
    
    // Shipment recalculation
    cy.wait(3000);

    // Submit address formular
    cy.get("#shipping-method-buttons-container").find('button').click();
    cy.wait(6000);
    
    // Assertion for success
    cy.url().should("contain", paymentUrl);

    // checkout...
    cy.get("button.checkout").click();
    cy.wait(4000);

    // Success message: Thank you for your purchase!
    cy.get('span[data-ui-id="page-title-wrapper"]').should('contain', 'Thank you for your purchase!');
  });
});
