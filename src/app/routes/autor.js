const express = require('express')
const route = express.Router()
const Autor = require('./../controllers/autor')

route.get('/listarTodos', Autor.findAll)
route.get('/listarUm/:nameAuthor', Autor.findById)
route.post('/criar', Autor.create)

module.exports = route