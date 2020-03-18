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
api.post('/newObj', objCtrl.saveObj);
api.get('/getObj/:pagina?', objCtrl.getObjects);
api.get('/findObj/:id', objCtrl.getObj);
api.get('/searchObj/:data', objCtrl.findObj);
api.put('/editObj/:id', objCtrl.editObj);
// Ruta para dar de baja un objeto: 

// Exportamos las rutas de objetos:
module.exports = api;