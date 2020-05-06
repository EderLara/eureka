'use strict';

/* Modelos (collections) de datos a Usar: */
let User = require('../models/usr.model');

// Importamos el modulo bcrypt, para las contraseñas:
let bcrypt = require('bcrypt-nodejs');
// Importamos el servicio jwt encargado de los tokens:
let jwt = require('../services/jwt');
// Cargamos el mongoose de paginacion:
let mongoosePaginate = require('mongoose-pagination');
// Cargamos el framework para trabajar con fechas:
let moment = require('moment');
// Libreria para manejo de archivos y de url:
let fs = require('fs');
let path = require('path');
let ahora= moment();
// Cargamos el archivo de mensajes:
const { msj } = require('./msjs');

// Creacion de funciones para pruebas de respuesta:
function pruebas(req, res){
	console.log(req.body);
	res.status(200).send({
        message: 'Ruta de Pruebas de usuario',
        now : ahora
	});
}
/* Estas funciones las usaremos mas adelante: */
// Funcion Guardar User:
function saveUser(req, res){
	// Variable que captura los campos del formulario:
	const params = req.body;
	//  Variable para almacenar en el modelo:
	let user = new User();
	// Validamos si los campos obligatorios estan llenos:
	if (params.identificacion && params.nombres && params.apellidos && params.amos) {
		// Asignamos el valor obtenido por post a las variables:
		user.identificacion = params.identificacion;
		user.nombres = params.nombres; 
        user.apellidos = params.apellidos;
        user.amos = params.amos;
        // Almacenamos los datos por defecto:
        user.RFID = 'aaaaxxxxsssseeee';
		user.estado = 'Activo';

		// Sentencias para consultar en la base de datos:
		// Primero buscamos coincidencias en la base de datos:
		User.find({ $or: [
					{ identificacion: user.identificacion},
					{ amos: user.amos }
				  ]})
				 .exec((err, userRow) =>{
				 	// Validacion de conexion al servidor:
				 	if (err) return res.status(500).send({ message: 'Error en la peticion al servidor' });
				 	// Validacion de Busqueda en la coleccion users:
				 	if (userRow && userRow.length >= 1) {
				 		return res.status(200).send({ message: 'El usuario que intenta guardar ya existe'});
				 	}else{
                        // Procedemos a guardar al user:
                        user.save((err, userStored)=>{
                            // Validamos errores de servidor:
                            if (err) return res.status(500).send({ message: 'Ha ocurrido un error en la peticion al servidor'});
                            // Validamos que se haya guardado el user:
                            if (userStored) {
                                // Enviamos un mensaje y mostramos los datos del user guardado:
                                return res.status(200).send({
                                    UserSave: userStored 
                                });
                            }else{
                                // Si no hay error de servidor pero tampoco se guardó el user mostramos un mensaje de error:
                                res.status(404).send({
                                    message: 'Error no se ha guardado el user'
                                });
                            }
                        });
				 	}
				 });

	}else{
		res.status(200).send({ 
			message: 'Debes llenar los campos obligatorios' 
		});
	}
}
// Fin del metodo de guardar user
// ----------------------------------------------------------- //
// Inicio de metodo de buscar Un test por id de test:
function getUser(req, res){
	// Recogemos el id por URL, cuando es por URL utilizamos .params, cuando es por post o get usamos .body
	var userId = req.params.cc;

	User.findById(userId, (err, user) =>{
		// validamos si hay algun error de conexion a la bd o de ejecucion:
		if (err) return res.status(500).send({
			message: 'Ha habido un error en la conexion o en la busqueda del test'
		});
		if (!user) return res.status(404).send({
			message: 'No se han encontrado conincidencias con el parametro de busqueda'
		});
		// Si encuentra al test, nos muestra al test:
		return res.status(200).send({ user });
	});
}
// Fin de Buscar un test
// ----------------------------------------------------------- //
// Inicio de metodo listar users:
function getUsers(req, res){
	// Variable para paginar, por defecto = 1:
	var pagina = 1;

	if (req.params.pagina) {
		pagina = req.params.pagina;
	}
	// Variable para determinar la cantidad de users conectados
	var itemsPerPage = 100;
	// Query de busqueda de users en la BD:
	User.find().sort('_id').paginate(pagina, itemsPerPage, (err, users, total) =>{
		// validamos si hay algun error de conexion a la bd o de ejecucion:
		if (err) return res.status(500).send({
			message: 'Ha habido un error en la conexion o en la busqueda del test'
		});
		// Si no obtenemos ningun test:
		if (!users) return res.status(404).send({
			message: 'No hay users Disponibles!.'
		});
		// Respuesta con lista de todos los users:
		return res.status(200).send({
			users,
			total,
			paginas: Math.ceil(total/itemsPerPage)
		});
	});

}
// Fin de listar users
// ----------------------------------------------------------- //
// A continuación una función para buscar coincidencias en la base de datos, en este caso solo será por un parámetro:
// Función para buscar usuarios que coincidan en la base de datos por cedula:
function findUser (req, res) {
    // Capturamos el dato en una expresión regular de tal forma que nos quede así: db.colllection.find({ attr: /variable/ i })
    let dato = new RegExp(req.params.data, 'i');
    // Buscamos en la base de datos en la coleccion objetos, todos los atributos que tengan ese 
    User.find({
               $or:[ 
                    {"identificacion ": dato },
                    {Amos: dato}
                   ]}).exec(( err, result )=>{
        // Validamos que la conexión a la base de datos sea correcta:
        if (err) return res.status(500).send({ error: msj.m500 });
        // Validamos que obtengamos al menos una coincidencia:
        if (result.length <= 0) return res.status(404).send({ error404: msj.m404 });
        // Retornamos el resultado de busqueda:
        return res.status(200).send({
            mesagge: msj.m200,
            Usuario : result
        });
    });
}
// Fin de buscar usuario
// ----------------------------------------------------------- //
// Funcion actualizar users:
function updateUser(req, res){
	// Variable de url para recoger el id del test a modificar:
	var userId = req.params.id;
	var update = req.body;

	// Borrar la propiedad password:
	delete update.Amos;

	if (userId != req.user.sub) {
		return res.status(500).send({ message: 'No tienes permiso para actualizar los datos de user, debes iniciar sesion' });
	}
	Test.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) =>{
		// Si ocurre un error inesperado de servicios:
		if(err) return res.status(500).send({message: 'Error en la Peticion, error de servidor' });
		// Si no se encuentran datos del test:
		if(!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar al usuario '});

		// Si todo sale bien devuelve al test modificado:
		return res.status(200).send({ user: userUpdated });
	});
}
// Fin de Actualizar campos del test:
// ----------------------------------------------------------- //
/*------------------------------------ FIN CRUD test: ----------------------------------------*/
// exportamos las funciones:
module.exports = {
	pruebas,
	saveUser,
    getUser,
    findUser,
	getUsers,
	updateUser
}
