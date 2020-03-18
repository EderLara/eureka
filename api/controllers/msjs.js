/* 
    Este archivo contiene los mensajes que queremos retornar en cada función, se han tenido encuenta mensajes 2XX, 4XX, y 5XX
*/
'use strict';
// Esportamos el json con los mensajes:
module.exports = {
    msj:{
        m200: 'La petición se ha completado correctamente',
        m400: 'Error de Registro: Se deben llenar los campos obligatorios',
        m404: 'No se han encontrado resultados',
        m408: 'Se ha agotado el tiempo de para ejecutar la acción',
        m409: 'Ya se encuentra registrado en la base de datos',
        m500: 'Ha ocurrido un error en la petición a la base de datos, revise las conexiones'
    }
}