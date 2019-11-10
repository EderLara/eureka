'use strict';

/* Traermos las librerias necesarias: */
const express = require('express');
const TestController = require('../controllers/test.control');
// Cargamos el metodo de express, llamado Router, para los metodos get y post:
const api = express.Router();

// Librerias que se usarán:
//Cargar multiparty:
const multipart = require('connect-multiparty');
// Cargar middleware:
const md_auth = require('../middleware/autenticacion');
// Middleware para subir archivos:
const md_upload = multipart({ uploadDir: './uploads/test/'});

// Rutas para ensayar:
api.get('/home', TestController.home);
api.get('/pruebas', TestController.pruebas);

/* Rutas del Crud de Test: aplicacion corre desde: http://localhost:3800/api */
// Guardar documento e iniciar sesión:
api.post('/registro', TestController.saveUser);
api.post('/login', TestController.loginUser);
// Traer un documento, y mostrar todos los documentos:
api.get('/test/:id', md_auth.ensureAuth, TestController.getUser);
api.get('/docs/:page?', md_auth.ensureAuth, TestController.getUsers);
// Actualizar datos de Usuario:
api.put('/update/:id', md_auth.ensureAuth, TestController.updateUser);
// Ruta para agregar imagen. Para esta ruta le pasaremos los identificadores de la cabecera:
api.post('/test/perfil/:id', [md_auth.ensureAuth, md_upload], TestController.addImage);
// Ruta para mostrar la imagen cargada:
api.get('/test/imagen/:imageFile', TestController.getImageFile);

/*        Exportamos la ruta:       */
module.exports = api;