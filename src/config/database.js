const mongoose = require("mongoose")
require('dotenv').config()
let db = null

db = mongoose
    .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Banco de dados conectado!'))
    .catch(error => {
        console.log(`Problema ao contectar com o banco de dados: ${error.message}`);
    });

module.exports = { db }