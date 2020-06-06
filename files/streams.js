// Este arhivo nos permite leer el archivo en segundo plano y acceder a el solo cuando se requiera:

'use strict';
const fs = require('fs');

// Incluiremos la vista en la cosola del tiempo de ejecución, para ver cuanto tarda (cronometro inicio)
console.time('Tiempo de respuesta');

// Creamos un ciclo para leer el archivo de forma sincronica, este archivo se va a leer 5 veces: -Este es el método lento:
for (let i = 0; i <= 5; i++) {
    // Leemos el archivo "file.txt" en formato utf8:
    fs.readFileSync('file.txt', 'utf8');    
}

// Modo en stream, mucho m´´as rápido:
for (let i = 0; i <= 5; i++) {
    // Leemos el archivo "file.txt" en formato utf8:
    const leerStreamFile = fs.createReadStream('file.txt',{
        encoding: 'utf-8'
    });

}

// Cuando todo termine, mostraremos cuanto se gastó (cronometro end):
console.timeEnd('Tiempo de respuesta');

/* 
    Con los streams se ejecuta la lectura del archivo sin afectar los tiempos de ejecución,
    esto quiere decir que se ejecuta en segundo plano y podemos optimizar la velocidad de la aplicación.
*/