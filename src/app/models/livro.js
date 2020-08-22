const { Schema, model } = require("mongoose")

const LivroSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true
    },
    sinopse: {
        type: String,
        required: true,
        trim: true
    },
    paginas: {
        type: Number,
        required: false
    },
    imagem: {
        type: String,
        required: true,
        trim: true
    },
    editora: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor'
    },
    gostei: {
        type: Boolean
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = model('Livro', LivroSchema)