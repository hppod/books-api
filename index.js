const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const PORT = process.env.PORT || 3000
const database = require("./src/config/database")
const LivroRoutes = require("./src/app/routes/livro")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/json' }))

app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/', (req, res) => {
    res.send({ message: `API books-api ouvindo na porta ${PORT}` })
})

app.use("/livros", LivroRoutes)

app.use('*', (req, res) => res.send({ message: 'API não encontrada' }))

app.listen(PORT, () => console.log(`API ouvindo na porta ${PORT}`))