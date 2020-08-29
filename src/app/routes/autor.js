const express = require('express')
const route = express.Router()
const Autor = require('./../controllers/autor')

route.get('/listarTodos', Autor.findAll)
route.get('/listarUm/:idAuthor', Autor.findById)
route.post('/criar', Autor.create)
route.get('/validarNomeAutor', Autor.validatorNomeAutor)

module.exports = route