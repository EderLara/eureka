/* Archivo Servicio JWT para la auntenticacion del usuario, en este caso test: */
'use strict';

// Variables para utilizar los metodos de jwt y moment:
const jwt = require('jwt-simple');
const moment = require('moment');
// Variable secreta para token:
const secret = 'clave_secreta_pruebas_node_js';

// Creamos el objeto createToken:
exports.createToken = function(user){
	let payload = {
	    //Atributos de la entidad test:
		sub: user._id,
		identificacion : user.identificacion,
		nombres : user.nombres,
		apellidos : user.apellidos,
		genero : user.genero,
		fechanace : user.fechanace,
		email : user.email,
		passuser : user.passuser,		
		// Fechas de creacion y expiracion del moment:
		iat: moment().unix(),
		exp: moment().add(12, 'hours').unix
	};
		return jwt.encode(payload, secret)
}