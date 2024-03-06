export default class HomePage{

    getMeals(){
        return cy.get("#meals .meal-item");
    }
    getCartButton(){
        return cy.get("#main-header > :nth-child(2) > :nth-child(2)");
    }

}