'use strict'

// Variable de peticiones a la base de datos:
const mongoose = require('mongoose');
// Creamos una variable para usar los metodos de schema:
let Schema = mongoose.Schema;

// Creamos la tabla usuario:
const testSchema = Schema({
	identificacion : String,
	nombres : String, 
	apellidos : String,
	imgPerfil : String,
	rolUser : String,
	genero : String,
	fechanace : Date,
	email : String,
	passuser : String,
	estauser : String
});

// Exportar la tabla para usarla:
module.exports = mongoose.model('Test', testSchema);