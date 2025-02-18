//elementu skaiciavimo susiskaiciuoti kiek mes turim li saraso elementu

//Svetaine prisijungimas ir registracija
//1.testuoti pacia registracija. Ar galima uzsiregistruoti?
//2. pati prisijungima. Ar galima prisijungti?
//3. Integracinis testas: Ar uzsiregistravus galima prisijungti?
//4. musu rasomas testas tures buti prisijunges prie svetaines, atsiminti kad jis yra prisijunges
//5. Kaip tas pats funkcionalumas yra atvaizduojamas prisijungusiam ir neprisijungusiam vartotojui

//Prisijungimo atsiminmas(sesijos isaugojimas)
//Sesija - serverio atminties vieta, kur svetainė gali išsaugoti informaciją
//Cookie - vieta vartotojo kompiuteryje, kur svetainė gali išsaugoti informaciją

//Kokią info saugau sesijoje? jautrūs duomenys - slaptažodis, prisijungimo vardas, prisijungimo tokenas, asmens informacija...
// Kokią info saugau cookie? viską, išskyrūs jautrią informaciją

//abiem galima nustatyti laiką, kiek jie egzistuoja

//Sukurti ir gauti cookie

//Ar sutinkate su slapukais popup testavimas?
it('Ar svetainė leidžia sukurti cookie?', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.setCookie('test', 'test');
});

//Ar informacija išsisaugo po svetainės persikrovimo?
//1. Užeiti į svetainę
//2. Sukurti informacinį cookie(JSON text formate, kažkokds dkaičius, tekstas ir t.t.)
//3. Sukurti kelis cookies
//3.1 Cookies info yra surašoma į div arba į ul ir t.t.
//4. perkrauti svetainę
//5. Patikrinti ar cookies išliko po perkrovimo

it('Ar iformacija išsisaugo po svetainės perkrovimo?', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.setCookie('test', '1');
    cy.setCookie('test1', 'test1');
    cy.setCookie('test2', '{user: mokomes}');
    cy.reload();
    //Po reload turim  gauti cookie ir patikrinti ar jo vardas egzistuoja
    //Set nustatyti, get - gauti
    cy.getCookie('test').should('exist');
    cy.getCookie('test1').should('exist');
    cy.getCookie('test2').should('exist');

    //patikriname cookies reikšmes
    cy.getCookie('test').should('have.property', 'value', '1');
    cy.getCookie('test1').should('have.property', 'value', 'test1');
    cy.getCookie('test2').should('have.property', 'value', '{user: mokomes}');

    // galim ištrinti rakiniu būdu cookie ir patikrinti ar jie nebeegzistuoja
    cy.clearCookies();
    cy.getCookie('test').should('be.null');
    cy.getCookie('test1').should('be.null');
    cy.getCookie('test2').should('be.null');

    //vieno cookie trynimas
    //cy.clearCookie('test')
});

//ar visi testai po cookies sukūrimo mato cookie?
it('Ar iformacija išsisaugo po svetainės perkrovimo?', () => {
    cy.visit('https://todolist.james.am/#/');

    cy.getCookie('test').should('exist');
    cy.getCookie('test1').should('exist');
    cy.getCookie('test2').should('exist');

    //cookies egzistuoja tik konkrečiame teste, kituose nžjų nėra reikia iš naujo kurti
});

//sesija
it('testas su sesija', () => {
    cy.session('sesija', () => {
        cy.visit('https://todolist.james.am/#/');
        cy.get('input.new-todo').type('1 uzdutis{enter}');
    });//prisimea užduotis kito prisijugimo metu ir kodas aukščiau nenaudojamas būna.
    cy.visit('https://todolist.james.am/#/');
});

it('testas be sesijos', () => {
    cy.session('sesija', () => {
        cy.visit('https://todolist.james.am/#/');
        cy.get('input.new-todo').type('1 uzdutis{enter}');
    });
});