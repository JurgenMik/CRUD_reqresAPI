/// <reference types="cypress" />
// @ts-ignore

  describe('Test 1', () => {
    it('Check for users', () => {
        cy.visit('localhost:3000');

        cy.get('table').first().should('contain.text', 'George');

        cy.get('table').last().should('contain.text', 'Tracey')

    })
})
  describe('Test 2', () => {
    it ('Create new user', () => {
        cy.visit('localhost:3000');

        cy.get('button').should('contain.text', 'Create').click();

        cy.get('input[name=first_name]').focus().type(
            'Deimar'
        ).should('have.value', 'Deimar');

        cy.get('input[name=last_name]').focus().type(
            'Pralle'
        ).should('have.value', 'Pralle');

        cy.get('input[name=email]').focus().type(
            'deimar.P@gmail.com'
        ).should('have.value', 'deimar.P@gmail.com');

        cy.get('input[name=avatar]').focus().type(
            'profile1'
        ).should('have.value', 'profile1');

        cy.get('button[type=submit]').click();

        cy.get('table').last().should('contain.text', 'Deimar');

    })
})

  describe('Test 3', () => {
    it ('Delete user', () => {

      cy.visit('localhost:3000');

      cy.get('button[id=2]').should('contain.text','Delete').click();

      cy.get('tbody[key=2]').should('not.exist');
    })
})

  describe('Test 4', () => {
    it('Edit user', () => {

      cy.visit('localhost:3000');

      cy.get('button[name=2]').should('contain.text','Edit').click();

      cy.get('input[name=last_name]').clear();

      cy.get('input[name=last_name]').type('Alice').should('have.value', 'Alice');

      cy.get('button[type=submit]').should('contain.text', 'Save').click();

      cy.get('table').last().should('contain.text', 'Alice');

    })
})




