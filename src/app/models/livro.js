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
    },
    isbn10: {
        type: String,
        required: false,
        trim: true
    },
    isbn13: {
        type: String,
        required: false,
        trim: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = model('Livro', LivroSchema)