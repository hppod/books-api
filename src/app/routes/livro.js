const express = require("express")
const route = express.Router()
const Livro = require("./../controllers/livro")

route.get("/listarTodos", Livro.findAll)
route.get("/listarUm/:bookName", Livro.findById)
route.post("/criar", Livro.create)
route.get('/validarNomeLivro', Livro.validatorNomeLivro)
route.put('/atualizar/:bookId', Livro.update)

module.exports = route