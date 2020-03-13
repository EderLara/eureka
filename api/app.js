// Usamos script, para indexar mejor nuestro arbol de archivos. Se aconseja poner el ´;´ para evitar desbordamientos de memoria 
'use strict';
// Creamos las variables para el uso de los diferentes frameworks: 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

/* Secciones: */
/* Cargar Rutas: */
// Cargamos la rutas de los controles:
const rutastest = require('./rutas/test.routes');
const rutasobjs = require('./rutas/obj.routes');

/* Cargar Middlewares: */
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
/* cors -cabeceras-: */
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

/* Rutas: */
// Reescribimos la url para que cargue desde /api así: http://localhost:3800/api/test:
app.use('/api', rutastest);
app.use('/api', rutasobjs);

// Exportamos la variable app:
module.exports = app;