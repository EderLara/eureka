'use strict';

// Cargamos las variables requeridas para el modelo de datos:
let mongoosePaginate = require('mongoose-pagination');
let Obj =  require('../models/obj.model');

// Libreria para manejo de archivos y de url:
let fs = require('fs');
let path = require('path');

// Variables con los mensajes a la petición:
let msj400 = 'Error de Registro: Se deben llenar los campos obligatorios';
let msj200 = 'La petición se ha completado correctamente';

// Funciones de Pruebas.
function objTest(req, res) {
    res.status(200).send({
        ObjCTRL: 'Accediendo a la ruta de prueba de Objetos'
    });
}
// ----------------------------------------------------------- //
// ---------------------- Funciones CRUD --------------------- //

// Función Guardar Objeto:
function saveObj(req, res){
    // Parámetros del formulario:
    let params = req.body;
    // Constructor de objeto;
    let obj = new Obj();
    // Validación de Campos Obligatorios:
    if (params.idr && params.nombobj) {
        // Asignamos los valores obtenidos del formulario a el modelo del objeto:
        obj.idRFID = params.idr;
        obj.NombObjet = params.nombojb;
        // Operaciones de Base de datos:
        // Primero: Consultamos que no exista el objeto en la base de datos:
        Obj.findOne({
            $or: [
                {idRFID = obj.idRFID},
                {NombObjet = obj.NombObjet}
            ]
        })
    }else{
        return res.status(400).send({ msj400 });
    }
}



// ----------------------------------------------------------- //
// -------------------- FIN Funciones CRUD ------------------- //
// Exportamos las funciones para su uso en las rutas:
module.exports = {
    objTest
}