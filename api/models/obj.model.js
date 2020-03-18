'use strict';

// Variable de peticiones a la base de datos:
const mongoose = require('mongoose');
// Creamos una variable para usar los metodos de schema:
let Schema = mongoose.Schema;
// Configuración de la coleccion:
const objSchema = Schema({
    idRFID: String,
    NombObjet : String,
    StateObj: String,
    createAt : Date 
});

// Retornamos una coleccion de nombre 'Objeto' (que se volverá plural), con las propiedades de la constante objSchema:
module.exports =  mongoose.model('Objeto',objSchema);