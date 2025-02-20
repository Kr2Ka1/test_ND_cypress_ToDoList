/// <reference types="cypress" />


//tipsas: radau vien tipsa, ziauriai patogu AutomationExercise casus rasyt, 
// tarkim rasot koki 8 case ir nenorit kad visus it'us leistu kiekviena kart ir kad nereiktu uzkomentuot, 
// tai prie to it su kuriuo dirbat parasot it.only('it pavadinimas', () => {jusu blabla}), tai tas only leis tik ta viena case! 

it('Request, intercept, visit', () => {
    //API
    //pagal mūsų pateiktus duomenis, kreipiasi į url ir gražina informaciją iš to url
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then((response) => {
        // expect(response.status).to.be.eq(200); //ar status kodas 200
    });

    //Internetinė svetainė
    //pasakom naršyklei kad ji užeitų į svetainę
    cy.visit('https://todolist.james.am/#/') // tiesiog uzeinu i svetaine

    //perimti
    //sis metodas dazniau naudojamas API, kai API kviečia naršyklė!!!
    //pagal mūsų patektus duomenis, kreipiasi į url, mes ją perimam ir ją galima sumanipuliuoti
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts/104");// šita nuoroda man gražina 404/post kurio ir id=104
    // mes galime pasidaryti savo responce
    // kokiai nors nuorodai(url) suteikiam savo/iš karto numatytą atsakymą - mok arba stub


});

it('Get a post/mock post', () => {
    //gauti originalų post kurio id = 1
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then((response) => {
        cy.log(response.body);
    });

    // cy.intercept, nereaguoja į cy.request
    // cy.intercept reaguoja tik į cy.visit

    //Sumanipuliuoti, periimti post kurio id = 1
    //{userId: 104, title: 'perimtas pavadinimas', id: 104}
    cy.intercept('GET', "https://jsonplaceholder.typicode.com/todos/1", { 
    statusCode: 201, 
    body: { userId: 104, title: 'perimtas pavadinimas', id: 104 } }).as('getPostMock');
    cy.visit('https://jsonplaceholder.typicode.com');
    cy.get('#run-button').click();
    cy.wait('@getPostMock');
});



