const livro = require('./../models/livro')
const autor = require('./../models/autor')

class Livro {

    get(req, res) {
        livro.find({}, (err, data) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).json({ message: "Dados recuperados com sucesso", dados: data })
            }
        })
    }

    getByName(req, res) {
        livro.find({ nome: req.params.nome }, (err, data) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).json({ message: "Dado recuperado com sucesso", dado: data })
            }
        })
    }

    create(req, res) {
        const reqBody = req.body
        const idAuthor = reqBody['autor']

        livro.create(reqBody, (err, livro) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                autor.findById(idAuthor, (err, author) => {
                    if (err) {
                        res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
                    } else {
                        author.livros.push(livro)
                        author.save({}, (err) => {
                            if (err) {
                                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
                            } else {
                                res.status(201).json({ message: "Livro criado com sucesso" })
                            }
                        })
                    }
                })
            }
        })

    }

    put(req, res) {
        livro.updateOne({ nome: req.params.nome }, { $set: req.body }, (err) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).json({ message: "Livro atualizado com sucesso" })
            }
        })
    }

    delete(req, res) {
        livro.deleteOne({ nome: req.params.nome }, (err) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).json({ message: "Livro apagado com sucesso" })
            }
        })
    }
}
module.exports = new Livro()