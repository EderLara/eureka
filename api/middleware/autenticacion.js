// Archivo para la comprobación de la sesión del usario para efectos de operaciones de actualización, carga de archivos, entre otros
'use strict';

// Cargamos las librerias necesarias:
const jwt = require('jwt-simple');
const moment = require('moment');
// Copiaremos la misma clave secreta del servicio jwt, ya que este middleware hace uso del servicio para verificar la disponibilidad del token
const secret = 'clave_secreta_pruebas_node_js';

// Función para verificación de cabeceras de identificación, respuesta y permisos:
exports.ensureAuth = function(req, res, next){
    // Validamos el parámetro de autenticación:
    if(!req.headers.authorization){
        // Dado el caso de que no se reconozca el parámetro se indicará una alerta:
        return res.status(403).send({
            message : 'No se pueden verificar los parámetros de identificación'
        });
    }
    // Limpiamos el parámetro token, eliminando la cadena de caracteres del html (['"] y g):
    var token = req.headers.authorization.replace(/['"]+/g, '')  
    // Probamos decodificar el payload del usuario:
    try{
        // Decodificamos el pyload pasandolo por el servicio de jwt:
        var payload = jwt.decode(token, secret);
        // Validamos la fecha de caducidad:
        if(payload.exp <=moment().unix()){
            // Si la validación no pasa, pero el token si hace parte del usuario, mostramos el mensaje de expiración:
            return res.status(401).send({
                message : 'El tokén a expirado, Reinicie la Sesión.'
            });
        }
    }catch(ex){
        // Si no se reconoce el identificador del usuario, se le solicitará iniciar sesión:
        return res.status(404).send({
            message : 'El tokén no es Válido. Por favor inicie sesión'
        });
    }
    // Devolvemos al servicio el payload con la autorización:
    req.user = payload;
    // Continuamos:
    next();
}