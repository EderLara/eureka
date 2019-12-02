/* Segundo, Crear los modelos: */
// Creamos una clase con los atributos del modelo de datos, agregamos el atributo _id, que genera MongoDB:
export class Test{
    constructor(
        public _id: string,
        public identificacion: string,
        public nombres : string, 
        public apellidos : string,
        public imgPerfil : string,
        public rolUser : string,
        public genero : string,
        public fechanace : number,
        public email : string,
        public passuser : string,
        public estauser : string
    ){
        // Generamos las constantes del modelo:
        this.estauser = 'Activo';
    }
}
// Se pueden crear más clases, dependiendo del gusto del programador, pero para ser ordenados, se debe hacer de acuerdo a la modularidad propuesta en el desarrollo.
