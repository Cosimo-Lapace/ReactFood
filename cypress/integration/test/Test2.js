/// <reference types="cypress" />

import Cart from "../../pageObj/Cart";
import HomePage from "../../pageObj/HomePage";

describe("Cart Test", () => {
  const cart = new Cart();
  const homePage = new HomePage();
  it("Checking Cart is Empty", () => {
    cy.visit(Cypress.env("baseUrl"));
    homePage.getCartButton().click();
    cart.getModal().should("not.contain", "ul");
    cart
      .getModal()
      .find("p")
      .then(($el) => {
        expect($el.text()).to.equal("Your Cart is Empty :(");
      });
  });

  it("Checking Cart has 1 item", () => {
    cy.visit(Cypress.env("baseUrl"));
    homePage.getMeals().first().find("button").click();
    homePage.getCartButton().click();
    cart.getModal().find("ul").should("be.visible");
    cart.getModal().find("ul").should("have.length", 1);
    cart.getModalButton().click();
  });
  it("Checking Cart add 1 item", () => {
    cy.visit(Cypress.env("baseUrl"));
    homePage.getMeals().first().find("button").click();
    homePage.getMeals().each(($el, $i, $list) => {
      if ($el.text().includes("Margherita Pizza")) {
        cy.wrap($el.find("button")).click();
      }
    });
    homePage.getCartButton().click();
    cart.getModal().find("li").should("have.length", 2);
    let amount = 0;
    cart.getCartList().each(($el, $i, $list) => {
      if ($i === 0) {
        cy.wrap($el.find("button")).first().click();
        cart.getMealQuantity($i).then(($elment) => {
          expect(+$elment.text()).to.equal(2);
        });
      }
      cart.getMealQuantityInList($i).then(($elment) => {
        let x = +$el.text().split("x")[1].split("+")[0] * +$elment.text();
        amount = amount + x;
      });
    });
    cart.getCartTotal().then(($el) => {
      const totalPrice = $el.text().split("$")[1];
      expect(+totalPrice).to.equal(+amount);
    });
    cart.getCheckout().click();
    cart.getTitle().then(($el) => {
      expect($el.text()).to.not.equal("Cart");
    });
  });
});
