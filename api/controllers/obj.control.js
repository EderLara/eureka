'use strict';

// Cargamos las variables requeridas para el modelo de datos:
let mongoosePaginate = require('mongoose-pagination');
let Obj =  require('../models/obj.model');

// Libreria para manejo de archivos y de url:
let fs = require('fs');
let path = require('path');
// Cargamos el framework para trabajar con fechas:
let moment = require('moment');
let ahora = moment();

// Variables con los mensajes a la petición:
let msj200 = 'La petición se ha completado correctamente';
let msj400 = 'Error de Registro: Se deben llenar los campos obligatorios';
let msj404 = 'No se han encontrado resultados';
let msj408 = 'Se ha agotado el tiempo de para ejecutar la acción';
let msj409 = 'Ya se encuentra registrado en la base de datos';
let msj500 = 'Ha ocurrido un error en la petición a la base de datos, revise las conexiones';


// Funciones de Pruebas.
function objTest(req, res) {
    res.status(200).send(
        {
            ObjCTRL: 'Accediendo a la ruta de prueba de Objetos',
            HoraActual : ahora
        }
    );
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
    if (params.idr && params.nombojb) {
        // Asignamos los valores obtenidos del formulario a el modelo del objeto:
        obj.idRFID = params.idr;
        obj.NombObjet = params.nombojb;
        obj.createAt = moment();
        // Operaciones de Base de datos:
        // Primero: Consultamos que no exista el objeto en la base de datos:
        Obj.find({
            $or: [
                {idRFID : obj.idRFID},
                {NombObjet : obj.NombObjet}
            ]
        }).exec((err, objRow)=>{
            // Validamos la conexión a la base de datos y/o errores en consulta
            if (err) return res.status(500).send({ error: msj500 });
            // Si no encuentra ninguna coincidencia, volvemos un mensaje de ninguna coincidencia:
            if (objRow && objRow.length >= 1) {
                return res.status(409).send({ message: msj409 });
            } else {
                // Si el objeto no se encuentra en la base de datos y no existen conflictos en el motorDB, entonces procedemos a guardar:
                obj.save((err, objStorage)=>{
                    // Podemos recibir un error o un el objeto almacenado:
                    if (err) return res.status(500).send({ error: msj500 });
                    // Si el evento finaliza exitosamente entonces devolvemos el objeto guardado
                    if (objStorage) {
                        return res.status(200).send({
                            message: msj200,
                            Objeto: objStorage
                        });
                    } else {
                        // Si el objeto no se ha guardado, se enviará el mensaje de error:
                        return res.status(408).send({ error: msj408 });
                    }
                })
            } 
        });
    }else{
        // Retornamos el mensaje de campos obligatorios: 
        return res.status(400).send({ msj400 });
    }
}
// ----------------------------------------------------------- //
// Función mostrar todos los objetos:
function getObjects(req, res) {
    // Variables para controlar la cantidad de datos que se muestran por página y el control de la página:
    let itemxpag = 10;
    let pagina = 1;
    // Validamos el valor de página, inicialmente será 1, luego el valor que traiga por get:
    if (req.params.pagina) {
		pagina = req.params.pagina;
    }
    // Consultamos a la base de datos por los objetos:
    // Buscamos todo y lo ordenamos por _id, y los mostramos por paginación:
    Obj.find().sort('_id').paginate(pagina, itemxpag, (err, objects, total)=>{
        // Validamos si existen errores de conexión o de parametrización:
        if (err) return res.status(500).send({ msj500 });
        // Si no hay ningun objeto registrado en la base de datos:
        if (!objects) return res.status(404).send({ msj404 });
        // Resultados con todos los objetos por página:
        return res.status(200).send({
            msj200,
            objects,
            Páginas: Math.ceil(total/itemxpag)
        });
    });   
}
// ----------------------------------------------------------- //
// Función para buscar un objeto en particular:
function getObj(req, res) {
    // Capturamos el identificador del objeto usando el método GET:
    let idObj = req.params.id;
    // Buscamos en la base de datos este id:
    Obj.findById(idObj, (err, objeto)=>{
        // Validamos errores de conexión a la base de datos:
        if (err) return res.status(500).send({ msj500 });
        // Validamos la existencia del objeto en la base de datos:
        if (!objeto) return res.status(404).send({ msj404 });
        // Si encuentra el objeto, retornamos un mensaje de exito y los valores de este:
        return res.status(200).send({
            msj200,
            objeto
        });
    });
}
// ----------------------------------------------------------- //
// A continuación una función para buscar coincidencias en la base de datos, en este caso solo será por un parámetro:
// Función para buscar objetos que coincidan en la base de datos por nombre:
function findObj (req, res) {
    // Capturamos el dato en una expresión regular de tal forma que nos quede así: db.colllection.find({ attr: /variable/ i })
    let dato = new RegExp(req.params.data, 'i');
    // Buscamos en la base de datos en la coleccion objetos, todos los atributos que tengan ese 
    Obj.find({ NombObjet: dato }).exec(( err, result )=>{
        // Validamos que la conexión a la base de datos sea correcta:
        if (err) return res.status(500).send({ msj500 });
        // Validamos que obtengamos al menos una coincidencia:
        if (result.length <= 0) return res.status(404).send({ msj404 });
        // Retornamos el resultado de busqueda:
        return res.status(200).send({
            Objeto : result
        });
    });
}
// ----------------------------------------------------------- //

// ----------------------------------------------------------- //
// -------------------- FIN Funciones CRUD ------------------- //
// Exportamos las funciones para su uso en las rutas:
module.exports = {
    objTest,
    saveObj,
    getObjects,
    getObj,
    findObj
}