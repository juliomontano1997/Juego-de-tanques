






var cnv, ctx, pos_x = 0, img, fondo;

function anim() {
    ctx.clearRect(0, 0, 600, 200);
    ctx.drawImage(fondo,0, 0);
    ctx.drawImage(img, pos_x, 0);
    pos_x += 1;
    setTimeout(anim, 25);
}

function play1()
{
    img = new Image();
    fondo = new Image();
    img.src = 'imagenes/enemigo2.png';
    fondo.src = "imagenes/fondo.jpg";

    cnv = document.getElementById('lienzo');
    ctx = cnv.getContext('2d');
    // iniciar la animación
    anim();
}




function Objetos_animados(x,y,dir_imagen)
{
    this.imagen = new Image();
    this.imagen.src = dir_imagen;
    this.pos_x= x;
    this.pos_y= y;

    this.mover = function (direccion)
    {
        console.log("moviendome"+direccion);
        if(direccion==="derecha")
        {
            this.pos_x++;
        }
        else if(direccion==="izquierda")
        {
            this.pos_x--;
        }
        else if(direccion==="arriba")
        {
            this.pos_y--;
        }
        else
        {
            this.pos_y++;
        }
    };
}

window.onload = function() {
    document.onkeyup = muestraInformacion;
    document.onkeypress = muestraInformacion;
    document.onkeydown = muestraInformacion;
};

function muestraInformacion(elEvento)
{
    var evento = window.event || elEvento;
    var mensaje = "Tipo de evento: " + evento.type + "<br>" +
        "Propiedad keyCode: " + evento.keyCode + "<br>" +
        "Propiedad charCode: " + evento.charCode + "<br>" +
        "Carácter pulsado: " + String.fromCharCode(evento.charCode);
}

/*




var prueba = new Objetos_animados(0, 0, 'imagenes/enemigo2.png');


function mocer(elEvento) {
    var evento = window.event || elEvento;

    if (evento.charCode === 37) {
        prueba.mover("izquierda");
    }
    else if (evento.charCode === 38) {
        prueba.mover("arriba");
    }
    else if (evento.charCode === 39) {
        prueba.mover("derecha");
    }
    else if (evento.charCode === 40) {
        prueba.mover("abajo");
    }
}


var bandera = true;
function inicio()
{
}



function fin()
{
    bandera = false;
}

















// ----------------   El siguiente codigo son solo pruebas -------------------





function anim() {
    ctx.clearRect(0, 0, 600, 200);
    ctx.drawImage(fondo,0, 0);
    ctx.drawImage(img, pos_x, 0);
    pos_x += 1;
    setTimeout(anim, 25);
}





function dibujarMapa()
{
    var canvas = document.getElementById('lienzo');
    var contexto = canvas.getContext('2d');

    // imagen
    var imagen = new Image();
    imagen.onload = function(){
        contexto.drawImage(imagen,0,0);  // imagen completa en la posición (0,0)
        //contexto.drawImage(imagen,285,0, 150,107); // escalado
        //contexto.drawImage(imagen,130,85,80,60,285,205,150,107); // escalado de una porción
        //contexto.strokeStyle = 'yellow';
        //contexto.strokeRect (130,85,80,60); // rectángulo amarillo
    };
    imagen.src = 'imagenes/fondo.jpg';
}

var cnv, ctx, pos_x = 0, img, fondo;



function play1()
{
    img = new Image();
    fondo = new Image();
    img.src = 'imagenes/enemigo2.png';
    fondo.src = "imagenes/fondo.jpg";

    cnv = document.getElementById('lienzo');
    ctx = cnv.getContext('2d');
    // iniciar la animación
    anim();
}


// Son las figuras: (tanques, balas)
function Figura_con_movimiento(x,y)
{
    this.pos_x= x;
    this.pos_y= y;
    this.mover = function (direccion)
    {
        if(direccion==="derecha")
        {
            this.pos_x++;
        }
        else if(direccion==="izquierda")
        {
            this.pos_x--;
        }
        else if(direccion==="arriba")
        {
            this.pos_y--;
        }
        else
        {
            this.pos_y++;
        }
    };
}


function Tanque()
{
    this.disparar = function ()
    {
        // aqui lanza un disparo
    }
}

function Enemigo()
{
    // se pueden ubicar el tanque aliado ya sea por un metodo o por una variable global.

}

function Amigo()
{
}

function proyectil()
{

}



// Son las figuras que no tienen movimientos (paredes y objetivos)
function Figura_sin_movimiento(x,y)
{
    this.pos_x=x;
    this.pos_y=y;
}

function Muro()
{
}

function Pared()
{
}







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