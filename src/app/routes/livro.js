const express = require("express")
const route = express.Router()
const Livro = require("./../controllers/livro")

route.get("/listar-todos", Livro.get)
route.get("/listar-um/:nome", Livro.getByName)
route.post("/criar", Livro.post)
route.put("/atualizar/:nome", Livro.put)

module.exports = route