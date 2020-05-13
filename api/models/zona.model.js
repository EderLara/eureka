'use strict'
// Variable de estructura a la base de datos:
const mongoose = require('mongoose');
const moment = require('moment');
let ahora = moment();
// Creamos una variable para usar los metodos de schema:
let Schema = mongoose.Schema;

const zonaSchema = Schema({
    id: String,
    zone: String,
    fecha: { type: Date, default: Date.now }
})

module.exports = mongoose.model('zona', zonaSchema )