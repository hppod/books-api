const autor = require('./../models/autor')

class Autor {

    findAll(req, res) {
        autor.find({}, { livros: 0 })
            .sort({ nome: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).json({ message: "Não foram encontrados autores para listar" })
                    } else {
                        res.status(200).json({ message: "Autores recuperados com sucesso", data: data })
                    }
                }
            })
    }

    findById(req, res) {
        const { idAuthor } = req.params

        autor.findById(idAuthor)
            .populate('livros')
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
                } else {
                    if (data['livros'].length <= 0) {
                        res.status(200).json({ message: "Não foram encontrados livros do autor para listar" })
                    } else {
                        res.status(200).json({ message: "Livros do autor recuperados com sucesso", data: data })
                    }
                }
            })
    }

    create(req, res) {
        const reqBody = req.body

        autor.create(reqBody, (err, data) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(201).json({ message: "Autor criado com sucesso", data: data })
            }
        })
    }

    validatorNomeAutor(req, res) {
        const nome = req.query.nome.replace(/%20/g, " ")

        autor.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).send({ message: "Já existe um autor com esse nome", data: result.length })
                } else {
                    res.status(200).send({ message: "Autor disponível", data: result.length })
                }
            }
        })
    }

}

module.exports = new Autor()