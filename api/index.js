/* Agregamos la instruccion strict para acceder a las nuevas funciones de javascript: */
'use strict';
/* Cargamos las variables del entorno:*/
require('dotenv').config();
/* Conexion a la base de datos:
1. 	Cargamos la libreria mongoose: */
const mongoose = require('mongoose');
/* Agregamos app.js, el puerto del servidor y el string de conexión de la base de datos: */
const app = require('./app');
const port = process.env.PORT;
const path = process.env.BASE_URL;
const database = process.env.DB_MONGO_LOCAL;
/* Conexion a la base de datos:
2.Para conectarnos a mongo debemos utilizar un metodo de promesas: */
mongoose.Promise = global.Promise;
/* Conexion a la base de datos:
3. Conectamos con el servidor: */
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useMongoClient: true })
.then(() => {
	// Mostramos mensaje en la consola de conexion a la base de datos:
	console.log("Bienvenido, la conexion a la base de datos ha sido establecida a mongodb:Localhost");
	// Encendemos el servidor NodeJS:
	app.listen(port,() => {
		// Mostramos mensaje de conexión al servidor:
		console.log("Servidor NodeJS corriendo en: "+path+port);
		console.log("Podemos probar la api desde: "+path+port+"/api/ruta");
	})
})
// Si hay algún error, lo imprimimos:
.catch(err =>console.log(err));


