// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


///<reference types="Cypress"/>

beforeEach(()=>{
    cy.visit('src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', function() {
    it('Submete formulario com sucesso', () => {
        cy.get('#firstName').type('Jhuan Magno')
        cy.get('#lastName').type('Pisa Neves')
        cy.get('#email').type('jhuanzito@bol.com')
        cy.get('#open-text-area').type('Gostaria de ajuda TATGostaria de ajuda TATGostaria de ajuda TATGostaria de ajuda TATGostaria de ajuda TAT',{delay:0})
        cy.contains('Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('Exibe mensagem de erro de email invalido',()=>{
        cy.get('#firstName').type('Jhuan Magno')
        cy.get('#lastName').type('Pisa Neves')
        cy.get('#email').type('jhuanzitobol.com')
        cy.get('#open-text-area').type('Gostaria de ajuda TATGostaria de ajuda TATGostaria de ajuda TATGostaria de ajuda TATGostaria de ajuda TAT',{delay:0})
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Verifica se é possível colocar valor diferente de numero no campo phone',()=>{
        cy.get('#phone')
            .type('Character')
            .should('have.value','')
    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{
        cy.get('#firstName').type('Jhuan Magno')
        cy.get('#lastName').type('Pisa Neves')
        cy.get('#email').type('jhuanzitobol.com')
        cy.get('#open-text-area').type('Gostaria de ajuda TATGostaria de ',{delay:0})
        cy.get('#phone-checkbox').check()
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Preenche e limpa os campos nome, sobrenome, email e telefone',()=>{
        cy.get('#firstName')
            .type('Jhuan Magno')
            .should('have.value','Jhuan Magno')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('Pisa Neves')
            .should('have.value','Pisa Neves')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('jhuanzitobol.com')
            .should('have.value','jhuanzitobol.com')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('929818473839')
            .should('have.value','929818473839')
            .clear()
            .should('have.value','')
        cy.get('#open-text-area')
            .type('Gostaria de ajuda TATGostaria de ',{delay:0})
    })
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Envia o formuário com sucesso usando um comando customizado',()=>{
        cy.fillMandatoryFieldsAndSubmit()
    })
    it('seleciona um produto (YouTube) por seu texto',()=>{
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',()=>{
        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice',()=>{
        cy.get('#product')
            .select(1)
            .should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"',()=>{
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })
    it('marca cada tipo de atendimento',()=>{
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(($radio)=>{
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o último',()=>{
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
                .uncheck()
                .should('not.be.checked')
        
    })
    it('seleciona um arquivo da pasta fixtures',()=>{
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .should('exist','example.json')
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
        cy.fixture('example.json')
            .as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(($input)=>{
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
        cy.get('a[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr','target')
            .click()
        cy.url()
            .should('contain','privacy.html')
    })
    it('testa a página da política de privacidade de forma independente',()=>{
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr','target')
            .click()
        cy.title()
            .should('eq','Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.get('#title')
            .should('to.contain','CAC TAT - Política de privacidade')
        cy.get('#white-background')
            .should('to.contain','Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
            .should('to.contain','Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
            .should('to.contain','No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')
            .should('to.contain','Talking About Testing')
    })
  })