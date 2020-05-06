'use strict'

// Variable de peticiones a la base de datos:
const mongoose = require('mongoose');
// Creamos una variable para usar los metodos de schema:
let Schema = mongoose.Schema;

// Creamos la tabla usuario:
const userSchema = Schema({
	identificacion : String,
	nombres : String, 
	apellidos : String,
	amos : String,
    RFID : String,
    estado: String
});

// Exportar la tabla para usarla:
module.exports = mongoose.model('usuario', userSchema);