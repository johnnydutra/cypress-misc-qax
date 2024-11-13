import data from '../fixtures/orphanages.json'

describe('Orphanage register', () => {

  it('should register a new orphanage', () => {
    const orphanage = data.create;

    cy.visit('http://localhost:3000/orphanages/create')

    cy.window().then((window) => {
      cy.stub(window.navigator.geolocation, 'getCurrentPosition').callsFake((callback) => {
        callback({
          coords: {
            latitude: 37.7749,
            longitude: -122.4194,
            accuracy: 100
          }
        })
      })
    })

    cy.get('#page-create-orphanage legend')
      .should('be.visible')
      .should('have.text', 'Cadastro')

    cy.contains('label', 'Nome').parent().find('input')
      .type(orphanage.name)

    cy.get('#description').type(orphanage.description)

    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true })

    cy.get('#opening_hours').type(orphanage.opening_hours)
    
    cy.get('.save-button').click()

  })
})