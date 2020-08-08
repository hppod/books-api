const { Schema, model } = require("mongoose")

const LivroSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true
    },
    paginas: {
        type: Number,
        required: false
    },
    autor: {
        type: String,
        required: true,
        trim: true
    },
    editora: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = model('livroschema', LivroSchema)