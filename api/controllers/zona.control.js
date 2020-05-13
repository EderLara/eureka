'use strict'

// Modelo:
const Zone = require('../models/zona.model');
// Cargamos el framework para trabajar con fechas:
let moment = require('moment');
let ahora = moment().format('LTS');
// Cargamos el archivo de mensajes:
const { msj } = require('./msjs');

// Creacion de funciones para pruebas de respuesta:
function pruebas(req, res){
	console.log(req.body);
	res.status(200).send({
        message: 'Ruta de Pruebas de zonas',
        now : ahora,
        Mensajes: msj
	})
}
/* ------------------------------- Funciones CRUD ------------------------------- */

function getZonas(req, res) {
    // Buscamos las zonas:
    Zone.find().sort('fecha').exec((err, listzona)=>{
        if (err) return res.status(500).send({ msjError: msj.m500 });
        if (!listzona){
            return res.status(404).send({ message: msj.m404 });
        }else {
            return res.status(200).send({
                coverZona: listzona
            });
        }
    })
}


// Exportamos las funciones para su uso en las rutas:
module.exports = {
    pruebas,
    getZonas
}