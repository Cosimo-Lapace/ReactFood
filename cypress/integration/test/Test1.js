/// <reference types="cypress" />

import Cart from "../../pageObj/Cart";
import HomePage from "../../pageObj/HomePage";

describe("HomePage", () => {
  it("Checking Meal", () => {
    const homePage = new HomePage();
    let count = 0;
    cy.visit(Cypress.env("baseUrl"));
    homePage.getMeals().should("have.length", 20);
    homePage.getMeals().each(($el, $i, $list) => {
      if (
        $el.text().includes("Margherita Pizza") ||
        $el.text().includes("Seafood Paella")
      ) {
        cy.wrap($el.find("button")).click();
        count++;
      }
    });
    homePage.getCartButton().then(($el) => {
      if ($el.text().includes(`Cart(${count})`)) {
        cy.wrap($el).click();
      }
    });
    const cart = new Cart();
    cart.getModal().should("be.visible");
    cart.getModalButton().click();
    cart.getModal().should("not.be.visible");
  });
});
//cy.get('ul li')
