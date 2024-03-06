export default class Cart{
    getModal(){
        return cy.get('.modal');
    }
    getModalButton(){
        return cy.get("form.modal-actions > .button");
    }
}