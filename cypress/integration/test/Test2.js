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
  });
});
