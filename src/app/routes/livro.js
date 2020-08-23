const express = require("express")
const route = express.Router()
const Livro = require("./../controllers/livro")

route.get("/listarTodos", Livro.findAll)
route.get("/listarUm/:nameBook", Livro.findById)
route.post("/criar", Livro.create)
// route.put("/atualizar/:nome", Livro.put)
// route.delete("/apagar/:nome", Livro.delete)

module.exports = route