'use strict';

/* Traermos las librerias necesarias: */
const express = require('express');
const ZonaCtrl = require('../controllers/zona.control');

// Cargamos el metodo de express, llamado Router, para los metodos get y post:
const api = express.Router();

// Rutas de test:
api.get('/zonatest', ZonaCtrl.pruebas);
// Rutas del Crud, en este caso solo READ
api.get('/reportZona', ZonaCtrl.getZonas);

/*        Exportamos la ruta:       */
module.exports = api;