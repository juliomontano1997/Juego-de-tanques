function figura()
{
    this.pos_x;
    this.pos_y;

    this.mover = function () {

    };
}

function tanque()
{

}



function enemigos() {

}

function amigo() {

}

function proyectil()
{

}

const delay = 5000;

function inicio(){
    const worker = new Worker('worker.js');
    //envia la informacion al worker.js
    worker.postMessage(delay);
    //recibe la informacion del worker.js
    worker.onmessage = e => {
        console.log(`Worker says: "${e.data}"`);
    };
}
/*




function Persona(nombre)
{
    this.primerNombre = nombre;

    this.caminar = function () {
        console.log(nombre+" esta caminando");
    };

    this.diHola = function ()
    {
        console.log("Hola, Soy " + this.primerNombre);
    };
}


function Estudiante(primerNombre, asignatura)
{
    Persona.call(this, primerNombre);
    this.asignatura = asignatura;

    this.diHola = function(){
        console.log("Hola, Soy " + this.primerNombre + ". Estoy estudiando " + this.asignatura + ".");
    };

    this.diAdios = function() {
        console.log("¡ Adios !");
    };
}




// Creamos el objeto Estudiante.prototype que hereda desde Persona.prototype
// Nota: Un error común es utilizar "new Persona()" para crear Estudiante.prototype
// Esto es incorrecto por varias razones, y no menos importante que no le estamos pasando nada
// a Persona desde el argumento "primerNombre". El lugar correcto para llamar a Persona
// es arriba, donde llamamos a Estudiante.
//Estudiante.prototype = Object.create(Persona.prototype);    // Vea las siguientes notas

// Establecer la propiedad "constructor" para referencias a Estudiante
//Estudiante.prototype.constructor = Estudiante;



// Ejemplos de uso
var estudiante1 = new Estudiante("Carolina", "Física Aplicada");
estudiante1.diHola();    // muestra "Hola, Soy Carolina. Estoy estudianto Física Aplicada."
estudiante1.caminar();   // muestra "Estoy caminando!"
estudiante1.diAdios();   // muestra "¡ Adios !"

// Comprobamos que las instancias funcionan correctamente
console.log(estudiante1 instanceof Persona);      // devuelve true
console.log(estudiante1 instanceof Estudiante);   // devuelve true
*/