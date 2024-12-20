/// <reference types='cypress'/>
import { faker } from '@faker-js/faker';
import contrato from '../contracts/usuario.contrato'



describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar cadastros com sucesso', () => {
    cy.request('usuarios').then(response => {
return contrato.validateAsync(response.body)
    })
  });


it('Deve listar usuários cadastrados - GET', () => {
 cy.request({
  method: 'GET',
  url: 'usuarios',
 }).should(response => {
expect(response.status).to.equal(200)
expect(response.body).to.have.property('usuarios')
 })
});

it('Deve cadastrar um usuário com sucesso - POST', () => {
   cy.cadastrarUsuario(faker.internet.username(), faker.internet.email(), "teste", "true")
});


it('Deve validar um usuário com email inválido - POST', () => {
  cy.request({
method: 'POST',
url: 'login',
body:{
  "email": "fulan@qa.com",
  "password": "teste"
}, failOnStatusCode: false
  }).should(response =>{
    expect(response.status).to.equal(401)
    expect(response.body.message).equal('Email e/ou senha inválidos')
})
});


it('Deve editar um usuário previamente cadastrado -PUT', () => {
  cy.request('usuarios').then(response => {
    let id = response.body.usuarios[0]._id
    cy.request({
        method: 'PUT', 
        url: `usuarios/${id}`,
        body: 
        {
        "nome": "Victor Machado Teste EBAC",
        "email": "victor.machado@qa.com.br",
        "password": "teste",
        "administrador": "true"
          }
    }).then(response => {
        expect(response.body.message).to.equal('Registro alterado com sucesso')
    })
})
});

it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
  let usuario = faker.internet.username()
  cy.cadastrarUsuario(usuario, faker.internet.email(), "teste", "true")
  .then(response => {
      let id = response.body._id
      cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
      }).then(response =>{
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).to.equal(200)
      })
  })
});
});
  
  
  
  
  
  
  
