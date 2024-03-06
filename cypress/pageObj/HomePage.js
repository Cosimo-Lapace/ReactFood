export default class HomePage{

    getMeals(){
        return cy.get("#meals .meal-item");
    }
    getCartButton(){
        return cy.get("#main-header > :nth-child(2) > :nth-child(2)");
    }
    getOrderButton(){
        return cy.get("header div:nth-child(2) button:nth-child(1)");
    }

}