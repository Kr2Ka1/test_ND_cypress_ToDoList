/// <reference types="cypress" />

it('Fixtures works', () => {
    cy.fixture('users').as('usersJson').then((users) => {
        cy.log(users)
    })

    // cy.fixture('users').as('usersJson')//fixtures/users.json
    cy.fixture('example').as('exampleJson').then((example) => {
        cy.log(example)
    })//fixtures/example.json
    cy.fixture('products').as('productsCsv').then((products) => {
        cy.log(products)
    })//fixtures/products.csv
    // cy.fixture('productsssssssssss')//fixtures/productsssssssssss.csv
});

it('duomenų generavimas', () => {
    let tasks = [];
    for (let i = 1; i <= 100; i++) {
        tasks.push(i + ' uzduotis');
    }
    console.log(tasks);
    //kur įrašau failą ir ką įrašau į failą
    cy.writeFile("cypress/fixtures/todos.json", { "todos": tasks });
});

it('100 todos suvedimas į ToDoJames svetainę', () => {

    // for(let i=1; i<=100; i++){
    //     cy.get('input.new-todo').type(i + ' uzduotis{enter}');
    // }
    cy.session('fixture_sesija', () => {
        cy.visit('https://todolist.james.am/#/');

        cy.fixture('todos.json').as('Todos').then((todosFile) => {
            cy.log(todosFile);
            cy.log(todosFile.todos[54])
            //1 budas
            // for(let i=0; i<todosFile.todos.length -1; i++){
            //     cy.get('input.new-todo').type(todosFile.todos[i] +'{enter}')
            // };
            //2 budas
            todosFile.todos.forEach((todo) => {
                cy.get('input.new-todo').type(todo + '{enter}')
            });
            cy.get('ul.todo-list li').should('have.length', todosFile.todos.length);
        });
    });
    cy.visit('https://todolist.james.am/#/');
    cy.contains('ul.todo-list li', '1 uzduotis').should('be.visible');
    cy.get('ul.todo-list li').should('have.length', 100);
});
