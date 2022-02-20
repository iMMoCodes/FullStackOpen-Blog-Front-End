describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'user1',
      username: 'userOne',
      password: 's4l4s4n4',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('userOne')
      cy.get('#password').type('s4l4s4n4')
      cy.get('#login-button').click()
      cy.contains('user1 logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'userOne',
        password: 's4l4s4n4',
      }).then((response) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('testingcypress@test.com')
      cy.get('#create-blog-button').click()
      cy.contains('a new blog a blog created by cypress by cypress added')
    })
  })
})
