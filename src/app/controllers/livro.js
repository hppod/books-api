const livro = require('./../models/livro')
const autor = require('./../models/autor')

class Livro {

    findAll(req, res) {
        livro.find({})
            .populate('autor', { nome: 1, imagem: 1 })
            .sort({ nome: 1 })
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
        const { bookName } = req.params

        if (bookName == 'null') {
            res.status(400).json({ message: "O nome do livro não pode ser nulo" })
        }

        livro.findOne({ nome: bookName })
            .populate('autor', { nome: 1, imagem: 1 })
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
                                res.status(201).json({ message: "Livro criado com sucesso", data: livro })
                            }
                        })
                    }
                })
            }
        })

    }

    validatorNomeLivro(req, res) {
        const nome = req.query.nome.replace(/%20/g, " ")

        livro.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).send({ message: "Já existe um livro com esse nome", data: result.length })
                } else {
                    res.status(200).send({ message: "Livro disponível", data: result.length })
                }
            }
        })
    }
    
}
module.exports = new Livro()