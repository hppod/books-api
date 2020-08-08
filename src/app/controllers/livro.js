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
}
module.exports = new Livro()