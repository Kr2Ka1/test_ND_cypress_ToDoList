it('To Do List Test', () => {
    cy.visit('https://todolist.james.am/#/')
    cy.get('header').should('be.visible');
    cy.contains('h1', 'To Do List').should('be.visible');
    cy.get('footer').should('exist');
    cy.get('footer p').should('exist');
    cy.get('footer').contains('p', 'Double-click to edit a todo').should('be.visible');
    cy.get('footer p').invoke('text').then((text) => {
        cy.log('Footer tekstas:', text);
    });
});


it('is placeholder visible', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input').should('have.attr', 'placeholder', "What need's to be done?");
});

it('ne tuščias sąrašas', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('2 uzduotis{enter}');
    cy.get('input.new-todo').type('3 uzduotis{enter}');
    cy.get('ul.todo-list li').should('have.length.at.least', 2);
});