'use strict';

/* Traermos las librerias necesarias: */
const express = require('express');
const UserCtrl = require('../controllers/usr.control');
// Cargamos el metodo de express, llamado Router, para los metodos get y post:
const api = express.Router();

// Rutas para ensayar:
api.get('/userTest', UserCtrl.pruebas);

/* Rutas del Crud de Test: aplicacion corre desde: http://localhost:3800/api */
// Guardar usuario
api.post('/usernew', UserCtrl.saveUser);
// Traer un documento, y mostrar todos los documentos:
api.get('/usuario/:cc', UserCtrl.getUser);
api.get('/findUser/:data', UserCtrl.findUser);
api.get('/users/:pagina?', UserCtrl.getUsers);
// Actualizar datos de Usuario:
api.put('/userudt/:id', UserCtrl.updateUser);

/*        Exportamos la ruta:       */
module.exports = api;