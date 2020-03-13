'use strict';

/* Modelos (collections) de datos a Usar: */
let Test = require('../models/test.model');

// Importamos el modulo bcrypt, para las contraseñas:
let bcrypt = require('bcrypt-nodejs');
// Importamos el servicio jwt encargado de los tokens:
let jwt = require('../services/jwt');
// Cargamos el mongoose de paginacion:
let mongoosePaginate = require('mongoose-pagination');
// Libreria para manejo de archivos y de url:
let fs = require('fs');
let path = require('path');

// Creacion de funciones para pruebas de respuesta:
function home(req, res){
	res.status(200).send({
		message: 'Desde aquí ingresamos al servidor NodeJS'
	});
}
// Segunda Funcion:
function pruebas(req, res){
	console.log(req.body);
	res.status(200).send({
		message: 'Por acá tambien ingresamos a la ruta pruebas'
	});
}
/* Estas funciones las usaremos mas adelante: */
// Funcion Guardar test:
function saveUser(req, res){
	// Variable que captura los campos del formulario:
	const params = req.body;
	//  Variable para almacenar en el modelo:
	var test = new Test();
	// Validamos si los campos obligatorios estan llenos:
	if (params.identificacion && params.nombres && params.apellidos && params.email && params.passuser) {
		// Asignamos el valor obtenido por post a las variables:
		test.identificacion = params.identificacion;
		test.nombres = params.nombres; 
		test.apellidos = params.apellidos;
		// Vamos a controlar la imagen por defecto según el sexó del usuario:
		if (params.genero === 'F') {
			// Si el usuario es Femenino, la imagen será la de la niña
			test.imgPerfil = 'uploads/test/female.png';
		}else{
			// Si por el contrario es Masculino, pintaremos la del niño:
			test.imgPerfil = 'uploads/test/male.png'; 
		}
		// Aquí haremos un pequeño control para agregar usuarios de acuerdo a su rol:
		if(!params.rolUser){
			// Si no se encuentra el rol asignado, por defecto agregamos el rol 'ClienteBD'
			test.rolUser = 'ClienteBD';
		}else{
			// De lo contrario, le diremos cual es el rol del usuario:
			test.rolUser = params.rolUser;
		}
		// Continuamos agregando los otros parámetros:
		test.genero = params.genero;
		test.fechanace = params.fechanace;
		test.email = params.email;
		// Almacenamos la ultima columna o el ultimo registro el documento
		test.estauser = 'Activo';

		// Sentencias para consultar en la base de datos:
		// Primero buscamos coincidencias en la base de datos:
		Test.find({ $or: [
					{ identificacion: test.identificacion},
					{ email: test.email }
				  ]})
				 .exec((err, userRow) =>{
				 	// Validacion de conexion al servidor:
				 	if (err) return res.status(500).send({ message: 'Error en la peticion al servidor' });
				 	// Validacion de Busqueda en la coleccion tests:
				 	if (userRow && userRow.length >= 1) {
				 		return res.status(200).send({ message: 'El test que intenta guardar ya existe'});
				 	}else{
				 		// Encriptamos la contraseña para la base de datos
				 		bcrypt.hash(params.passuser, null, null, (err, hash) =>{
				 			test.passuser = hash;

				 			// Procedemos a guardar al test:
				 			test.save((err, userStored)=>{
				 				// Validamos errores de servidor:
				 				if (err) return res.status(500).send({ message: 'Ha ocurrido un error en la peticion al servidor'});
				 				// Validamos que se haya guardado el test:
				 				if (userStored) {
				 					// Enviamos un mensaje y mostramos los datos del test guardado:
				 					return res.status(200).send({
				 						UserSave: userStored 
				 					});
				 				}else{
				 					// Si no hay error de servidor pero tampoco se guardó el test mostramos un mensaje de error:
				 					res.status(404).send({
				 						message: 'Error no se ha guardado el test'
				 					});
				 				}
				 			});

				 		});
				 	}
				 });

	}else{
		res.status(200).send({ 
			message: 'Debes llenar los campos obligatorios' 
		});
	}
}
// Fin del metodo de guardar test
// ----------------------------------------------------------- //
// Inicio de sesion de test:
function loginUser(req, res){
	// Recogemos los datos del formulario:
	const params = req.body;
	let username = params.email;
	let password = params.passuser;

	// Query para comprobar test y contraseña en la base de datos:
	Test.findOne({email: username}, (err, user)=>{
		// Si existe algun error:
		if (err) return res.status(500).send({ message: 'Error en la peticion, Revisa la conexion a la base de datos' });
		if (user) {
			// Encriptamos el password en params y comparamos utilizando el metodo "compare":
			bcrypt.compare(password, user.passuser, (err, check) =>{
				if (check) {
					// check es un parametro para determinar el chequeo es decir, que todo va bien
					// Si check es correcto, devolverempos un token:
					if (params.gettoken) {
						// Generar y Devolver token:, importante crear carpeta services, y dentro el archivo jwt.js
						return res.status(200).send({
							token: jwt.createToken(user)
						});
						// A esta altura crear la carpeta middleware
					}else{
						// Devolvemos datos de test:
						return res.status(200).send({ user });
					}
				}else{
					// Si no va bien, retornamos:
					return res.status(404).send({ message: 'El test no ha sido identificado' });
				}
			});
		}else{
			return res.status(404).send({ message: 'El test no ha sido identificado o no existe!!' });
		}
	}); // Fin de la consulta
}
// Fin de iniciar sesion
// ----------------------------------------------------------- //
// Inicio de metodo de buscar Un test por id de test:
function getUser(req, res){
	// Recogemos el id por URL, cuando es por URL utilizamos .params, cuando es por post o get usamos .body
	var userId = req.params.id;

	Test.findById(userId, (err, user) =>{
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
// Inicio de metodo listar tests:
function getUsers(req, res){
	// usuario del middleware la propiedad sub que es el Id de test logueado:
	var idsUserid = req.user.sub;
	// Variable para paginar, por defecto = 1:
	var pagina = 1;

	if (req.params.pagina) {
		pagina = req.params.pagina;
	}
	// Variable para determinar la cantidad de tests conectados
	var itemsPerPage = 25;
	// Query de busqueda de tests en la BD:
	Test.find().sort('_id').paginate(pagina, itemsPerPage, (err, users, total) =>{
		// validamos si hay algun error de conexion a la bd o de ejecucion:
		if (err) return res.status(500).send({
			message: 'Ha habido un error en la conexion o en la busqueda del test'
		});
		// Si no obtenemos ningun test:
		if (!users) return res.status(404).send({
			message: 'No hay tests Disponibles!.'
		});
		// Respuesta con lista de todos los tests:
		return res.status(200).send({
			users,
			total,
			paginas: Math.ceil(total/itemsPerPage)
		});
	});

}
// Fin de listar tests
// ----------------------------------------------------------- //
// Funcion actualizar tests:
function updateUser(req, res){
	// Variable de url para recoger el id del test a modificar:
	var userId = req.params.id;
	var update = req.body;

	// Borrar la propiedad password:
	delete update.password;

	if (userId != req.user.sub) {
		return res.status(500).send({ message: 'No tienes permiso para actualizar los datos de test, debes iniciar sesion' });
	}
	Test.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) =>{
		// Si ocurre un error inesperado de servicios:
		if(err) return res.status(500).send({message: 'Error en la Peticion, error de servidor' });
		// Si no se encuentran datos del test:
		if(!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar al test '});

		// Si todo sale bien devuelve al test modificado:
		return res.status(200).send({ user: userUpdated });
	});
}
// Fin de Actualizar campos del test:
// ----------------------------------------------------------- //
// Actualizar campo de imagen

function addImage(req, res){
	// Variables de obtencion del dato desde el front:
	var userId = req.params.id;

	// Subir imagen:
	if (req.files) {
		// Ponemos el archivo a subir en una variable, image es el nombre del campo que debe tener el input:
		var filePath = req.files.image.path;
		console.log(filePath);
		// Se toman los separadores de la ruta del archivo y se eliminan:
		var fileSplit = filePath.split('\\');
		console.log(fileSplit);
		// Variable con el nombre del archivo, se carga el valor del campo 2 del fileSplit:
		var fileName = fileSplit[2];
		console.log(fileName);
		// Buscamos la extencion para validar que sea una imagen, ya que hasta ahora solo guardamos un archivo sin importar la extension:
		var fileExt = fileName.split('\.');
		console.log(fileExt);
		var extFile = fileExt[1];

		// Solo el test dueño de la cuenta puede subir imagenes:
		if (userId != req.user.sub) {
			// Llamamos a la funcion que elimina el archivo de la carpeta uploads:
			removerarchivo(res, filePath, 'No tienes permiso para actualizar los datos de test, debes iniciar sesion');
		}
		// Comprobamos que las extenciones son correctas:
		if (extFile == 'png' || extFile == 'jpg' || extFile == 'jpeg' || extFile == 'bmp' || extFile == 'gif') {
			// Estas seran las extenciones validas que le permitiremos al test, para guardar en la base de datos.
			// Procederemos a buscar al usuario y a actualizar el atributo imgPerfil:
			Test.findByIdAndUpdate(userId, {imgPerfil: fileName}, {new: true}, (err, userUpdated) =>{
				// Si ocurre un error inesperado de servicios:
				if(err) return res.status(500).send({message: 'Error en la Peticion, error de servidor' });
				// Si no se encuentran datos del test:
				if(!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar al test '});
				// Si todo sale bien devuelve al test modificado:
				return res.status(200).send({ user: userUpdated });
			});
		}else{
			// Llamamos a la funcion que elimina el archivo de la carpeta uploads:
			removerarchivo(res, filePath, 'Extensión no Válida!');
		}
	}else{
		// retornamos
		return res.status(200).send({ message: 'No se han enviado ningun archivo' });
	}
}
// Fin de cargar imagen.
// ----------------------------------------------------------- //
// Funcion auxiliar, o metodo para elimiar archivos de la carpeta uploads/tests :
function removerarchivo(res, filePath, message){
	//  El arhivo no es una imagen, por lo que lo vamos a eliminar del directorio, para eso usamos el metodo unlink, y la variable fs:
	fs.unlink(filePath, (err) =>{
		return res.status(200).send({ message: message });
	});
}

// ----------------------------------------------------------- //
// Funcion para devolver la imagen del test:
function getImageFile(req, res){
	// variable del archivo imagen a devolver:
	var imageFile = req.params.imageFile;
	// variable de la ruta de la imagen:
	var pathFile = './uploads/test/'+imageFile;
	// Comprobamos que el arhivo existe:
	fs.exists(pathFile, (exists) =>{
		if (exists) {
			res.sendFile(path.resolve(pathFile));
		}else{
			res.status(200).send({ message: 'No existe la imagen' });
		}
	});
}
// Fin de mostrar imagen.
// ----------------------------------------------------------- //
/*------------------------------------ FIN CRUD test: ----------------------------------------*/
// exportamos las funciones:
module.exports = {
	home,
	pruebas,
	saveUser,
	loginUser,
	getUser,
	getUsers,
	updateUser,
	addImage,
	getImageFile
}
