Cypress.Commands.add('visitWithGeolocationMock', (url, latitude = -23.5582274, longitude = -46.6800988) => {
  const geolocationMock = (win, latitude, longitude) => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition', cb => {
      return cb({ coords: { latitude, longitude } })
    })
  }
  cy.visit(url, {
    onBeforeLoad: win => {
      geolocationMock(win, latitude, longitude);
    }
  })
})