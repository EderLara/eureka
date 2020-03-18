'use strict';

// Cargamos las librerías necesarías:
let express = require('express');
let objCtrl = require('../controllers/obj.control');
const api = express.Router();

// Libreia para el manejo de archivos:
const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/objetos/'});

// Rutas y métodos de acceso:
// Ruta de pruebas:
api.get('/objetos', objCtrl.objTest);
// Rutas CRUD:
api.post('/newObj', objCtrl.saveObj);                   // Guardar un Objeto.
api.get('/getObj/:pagina?', objCtrl.getObjects);        // Mostrar objetos paginados.
api.get('/findObj/:id', objCtrl.getObj);                // Encontrar un objeto por identificador ("_id").
api.get('/searchObj/:data', objCtrl.findObj);           // Buscar un objeto por nombre (puede traer todas las coincidencias).
api.put('/editObj/:id', objCtrl.editObj);               // Editar un objeto por identificador.
api.put('/editAll', objCtrl.editAll);                   // Agregar un campo a todos los documentos de la collection.
// Ruta para dar de baja un objeto: 
api.put('/deleteObj/:id', objCtrl.delObj);              // Borrar lógicamente un objeto

// Exportamos las rutas de objetos:
module.exports = api;