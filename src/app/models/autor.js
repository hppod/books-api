const { Schema, model } = require("mongoose")

const AutorSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true
    },
    biografia: {
        type: String,
        trim: true
    },
    imagem: {
        type: String,
        trim: true
    },
    livros: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Livro'
        }
    ]
},
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = model('Autor', AutorSchema)