export default {
    baseUrl: cy.config().baseUrl,
    signupUrl: cy.config().baseUrl + '/customer/account/create',
    signinUrl: cy.config().baseUrl + '/customer/account/login',
    accountUrl: cy.config().baseUrl + '/customer/account', 
    saleUrl: cy.config().baseUrl + '/sale',
    bagsUrl: cy.config().baseUrl + '/gear/bags',
    addToCartUrl: cy.config().baseUrl + '/push-it-messenger-bag',
    checkoutUrl: cy.config().baseUrl + '/checkout',
    paymentUrl: cy.config().baseUrl + "/checkout/#payment"
}