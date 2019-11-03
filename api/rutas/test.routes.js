'use strict';

/* Traermos las librerias necesarias: */
const express = require('express');
const TestController = require('../controllers/test.control');
// Cargamos el metodo de express, llamado Router, para los metodos get y post:
const api = express.Router();

/* Librerias que se usarán:
//Cargar multiparty:
const multipart = require('connect-multiparty');
// Cargar middleware:
const md_auth = require('../middlewares/autenticacion');
// Middleware para subir archivos:
const md_upload = multipart({ uploadDir: './uploads/media'});
*/

// Rutas para ensayar:
api.get('/home', TestController.home);
api.get('/pruebas', TestController.pruebas);

// Rutas del Crud de Test: aplicacion corre desde: http://localhost:3800/api
api.post('/registro', TestController.saveUser);
api.post('/login', TestController.loginUser);


/*        Exportamos la ruta:       */
module.exports = api;