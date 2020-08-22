const livro = require('./../models/livro')
const autor = require('./../models/autor')

class Livro {

    findAll(req, res) {
        livro.find({})
            .populate('autor', { nome: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).json({ message: "Não foram encontrados livros para listar" })
                    } else {
                        res.status(200).json({ message: "Livros recuperados com sucesso", data: data })
                    }
                }
            })
    }

    findById(req, res) {
        const { idBook } = req.params

        livro.findById(idBook)
            .populate('autor', { nome: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).json({ message: "O livro solicitado não foi encontrado" })
                    } else {
                        res.status(200).json({ message: "Livro recuperado com sucesso", data: data })
                    }
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