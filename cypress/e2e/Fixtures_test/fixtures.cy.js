/// <reference types="cypress" />

it('Fixtures works', ()=>{
cy.fixture('users').as('usersJson').then((users)=>{
    cy.log(users)
})

// cy.fixture('users').as('usersJson')//fixtures/users.json
cy.fixture('example').as('exampleJson').then((example) =>{
    cy.log(example)
})//fixtures/example.json
cy.fixture('products').as('productsCsv').then((products)=>{
    cy.log(products)
})//fixtures/products.csv
// cy.fixture('productsssssssssss')//fixtures/productsssssssssss.csv
})