// Manejo de archivos con nodejs:
'use strict';

// fs = file system, se usa para la gestion de archivos en el programa:
const fs = require('fs');

// Creamos un archivo usando writeStream:
const archivo = fs.createWriteStream('file.txt');

// Creamos un archivo con un millon de lineas:
for (let i = 0; i <= 1e6 ; i++) {
    archivo.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n');
}
// Terminamos la creación del archivo:
archivo.end();
