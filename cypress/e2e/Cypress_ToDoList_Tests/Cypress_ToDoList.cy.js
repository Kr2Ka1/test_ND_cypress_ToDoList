///<reference types="cypress" />

it('To Do List Test', () => {
    cy.visit('https://todolist.james.am/#/')
    cy.get('header').should('be.visible');
    cy.contains('h1', 'To Do List').should('be.visible');
    // cy.get('header h1').should('have.text', 'To Do List');
    //cy.get('header h1').should('exist');
    //cy.get('header h1').should('be.visible');
    cy.get('footer').should('exist');
    cy.get('footer p').should('exist');
    cy.get('footer p').invoke('text').then((text) => {
        cy.log('Footer tekstas:', text);
    });
    cy.get('footer').contains('p', 'Double-click to edit a todo').should('be.visible');
});


it('is placeholder visible', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').should('have.attr', 'placeholder', "What need's to be done?");
    cy.get('input[placeholder="What need\'s to be done?"]').should('exist').should('be.visible');
});

it('ne tuščias sąrašas', () => {
    cy.addToDos('sessionName');
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('2 uzduotis{enter}');
    cy.get('input.new-todo').type('3 uzduotis{enter}');
    cy.get('ul.todo-list li').should('have.length.at.least', 2);
    cy.get('ul.todo-list li').each(($el) => {
        cy.log($el)
    });
    cy.get('ul.todo-list li')
        .each(($el, $list) => {
            $el.dblclick();
            cy.log($el, $list)
        })
        .then(($list) => {
            expect($list).to.have.length(9);
        })
});