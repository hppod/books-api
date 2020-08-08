const livroschema = require('./../models/livro')

class Livro {

    get(req, res) {
        livroschema.find({}, (err, data) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).json({ message: "Dados recuperados com sucesso", dados: data })
            }
        })
    }

    getByName(req, res) {
        livroschema.find({ nome: req.params.nome }, (err, data) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).json({ message: "Dado recuperado com sucesso", dado: data })
            }
        })
    }

    post(req, res) {
        livroschema.create(req.body, (err) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(201).json({ message: "Livro criado com sucesso" })
            }
        })
    }
}
module.exports = new Livro()