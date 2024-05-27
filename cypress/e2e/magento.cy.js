const baseUrl = "https://magento.softwaretestingboard.com";

const { password, emailAddress, firstname, lastname, address1, city, zip, phone, CountryCode, regionCode } = require("../fixtures/userData").newUser;

describe("Majento tests suite", () => {
  it("Register successfully", () => {
    cy.visit(baseUrl);
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

  it("Sign in successfully", () => {
    const signUrl = 'https://magento.softwaretestingboard.com/customer/account/login'

    // Connection to shop
    cy.visit(signUrl);
    cy.wait(2000);

    cy.url().should("contain", signUrl);

    // Fill email field
    cy.get('#email').type(emailAddress);
    // Fill password field
    cy.get('#pass').type(password);

    // Button submit for sign in
    // cy.get('#send2').click();
    cy.get("#login-form").submit();
    cy.wait(2000);

    // Assertion for success
    cy.url().should("contain", 'https://magento.softwaretestingboard.com/customer/account'); // TODO find how handle optionnal trailing slashes in url checks

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
    cy.wait(5000);

    // Add to cart TODO flacky
    cy.get('#product-addtocart-button').click();

    // check message you added
    cy.get('[data-ui-id="message-success"]').should("contain", "You added Push It Messenger Bag to your shopping cart.");

    // click on mini cart
    // cy.get('[href="https://magento.softwaretestingboard.com/checkout/cart/"]').click();
    cy.get('.showcart').click();

    // Wait for js magic to enable
    cy.wait(2000);

    // click on checkout // TODO flacky test
    cy.get("#top-cart-btn-checkout").click();
    cy.wait(7000);

    // check page is correct
    cy.url().should("contain", "https://magento.softwaretestingboard.com/checkout");
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
    // cy.get("#co-shipping-form").find("[name='country_id']").select('France').should('contain', 'France');
    cy.get('select[name="country_id"]').select(CountryCode);
    
    // Shipment recalculation
    cy.wait(3000);
    // Select Gironde (value=215)
    // cy.get('select[name="region_id"]').select(regionCode); // Not mandatory

    // Submit address formular
    // cy.get("#co-shipping-form").submit();
    // cy.get("[data-role='opc-continue']").click();
    cy.get("#shipping-method-buttons-container").find('button').click();
    cy.wait(4000);
    
    // check message Thank you...

    // https://magento.softwaretestingboard.com/checkout/#payment
    // cy.get("#co-payment-form").submit();
    cy.get("button.checkout").click();
    cy.wait(4000);

    // Success message: Thank you for your purchase!
    cy.get('span[data-ui-id="page-title-wrapper"]').should('contain', 'Thank you for your purchase!');
  });
});
