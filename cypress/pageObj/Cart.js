export default class Cart {
    getTitle(){
        return cy.get("h2");
    }
  getModal() {
    return cy.get(".modal");
  }
  getModalButton() {
    return cy.get("form.modal-actions > .button");
  }
  getCartList() {
    return cy.get("ul .cart-item");
  }

  getMealQuantity(mealIndex) {
    return cy.get(`ul > li:nth-of-type(${mealIndex + 1}) div span`);
  }
  getMealQuantityInList(mealIndex) {
    return cy.get(
      `ul > li:nth-of-type(${mealIndex + 1}) p > span:nth-of-type(2)`
    );
  }
  getMealPriceInList(mealIndex) {
    return cy.get(
      `ul > li:nth-of-type(${mealIndex + 1}) p > span:nth-of-type(3)`
    );
  }
  getCartTotal() {
    return cy.get(".cart-total");
  }
  getCheckout(){
    return cy.get(".modal-actions:nth-of-type(2) button:nth-of-type(2)");
  }
}
