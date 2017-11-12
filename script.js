
function jugar()
{
    var objetos_graf = [];
    lista_objetos_activos=[];
    function crearBordes()
    {
        for(i=0; i<15; i++)
        {
            var m11 = new Borde(i*40,0, "imagenes/pared.jpg");
            var m21 = new Borde(i*40,560, "imagenes/pared.jpg");
            objetos_graf.push(m11);
            objetos_graf.push(m21);
        }
        for(i=1; i<14; i++)
        {
            var mi = i*40;
            var m1 = new Borde(0, mi, "imagenes/pared.jpg");
            var m2 = new Borde(560, mi, "imagenes/pared.jpg");

            objetos_graf.push(m1);
            objetos_graf.push(m2);
        }
    }

    function espacioLibre (pos_x, pos_y, objetos)
    {
        var cantidad = objetos.length;
        for(i=0; i<cantidad; i++)
        {
            if(pos_x === objetos[i].pos_x && pos_y===objetos[i].pos_y)
            {
                return false;
            }
        }
        return true;
    }

    function crearMuros()
    {
        for(i=0; i<20; i++)
        {
            var x = Math.trunc(Math.random()*(14-1)+1)*40;
            var y = Math.trunc(Math.random()*(14-1)+1)*40;
            if(espacioLibre(x, y, objetos_graf))
            {
                var m2 = new Muro(x,y,"imagenes/pared.jpg",3);
                objetos_graf.push(m2);
                lista_objetos_activos.push(m2);
            }
        }
    }


    function crearEnemigos()
    {
        for(i=0; i<10; i++)
        {
            var x = Math.trunc(Math.random()*(14-1)+1);
            var y = Math.trunc(Math.random()*(14-1)+1);

            if(espacioLibre(x, y, objetos_graf))
            {
                var m2 = new Muro(x,y,"imagenes/pared.jpg",3);
                objetos_graf.push(m2);
                lista_objetos_activos.push(m2);
            }
        }
    }




    // -------------------  Funciones principales -------------------------


    var fondo = new Image();
    fondo.src = "imagenes/fondo.jpg";
    var cnv;
    var ctx;
    cnv = document.getElementById('lienzo');
    ctx = cnv.getContext('2d');

    document.onkeydown = moverJugador;
    crearMuros();
    crearBordes();

    var jugador = new Aliado(40, 40, "imagenes/enemigo1.png");
    lista_objetos_activos.push(jugador);
    objetos_graf.push(jugador);


    function anim(objetos) //Actualizar pantalla
    {
        console.log(objetos);
        ctx.clearRect(0, 0, 600, 600);
        ctx.drawImage(fondo,0, 0);
        var tam = objetos.length;
        for(i=0; i<tam; i++)
        {
            ctx.drawImage(objetos[i].imagen, objetos[i].pos_x, objetos[i].pos_y );
        }
        //setTimeout(anim, 25);
    }
    function  moverJugador(tecla)
    {
        jugador.mover(tecla.keyCode, objetos_graf);
        anim(objetos_graf);
    }
    anim(objetos_graf);
}






function Objetos_animados(x,y,dir_imagen)
{
    this.imagen = new Image();
    this.imagen.src = dir_imagen;
    this.pos_x= x;
    this.pos_y= y;


    this.especioLibre = function (pos_x, pos_y, objetos)
    {
        var cantidad = objetos.length;
        for(i=0; i<cantidad; i++)
        {
            if(pos_x === objetos[i].pos_x && pos_y===objetos[i].pos_y)
            {
                return false;
            }
        }
        return true;
    };

    this.mover = function (direccion, objetos)
    {
        console.log("moviendome"+direccion);
        if(direccion===39)
        {
            if(this.pos_x<520 && this.especioLibre(this.pos_x+40, this.pos_y, objetos))
            {
                this.pos_x+= 40;
            }
        }
        else if(direccion===37 )
        {
            if(this.pos_x>40 && this.especioLibre(this.pos_x-40, this.pos_y, objetos))
            {
                this.pos_x-= 40;
            }
        }
        else if(direccion===38)
        {
            if(this.pos_y>40 && this.especioLibre(this.pos_x, this.pos_y-40, objetos))
            {
                this.pos_y-=40;
            }

        }
        else if (direccion === 40)
        {
            if(this.pos_y<520 && this.especioLibre(this.pos_x, this.pos_y+40, objetos))
            {
                this.pos_y+=40;
            }
        }
    };
}





function Tanque(x,y,dir_imagen,vida)
{
    Objetos_animados.call(this, x,y,dir_imagen);
    this.vida=vida;
    this.disparar = function ()
    {
        // aqui lanza un disparo
    }
}

function Enemigo(x,y,dir_imagen)
{
    Tanque.call(this, x,y,dir_imagen,1);
    // se pueden ubicar el tanque aliado ya sea por un metodo o por una variable global.
}

function Aliado (x,y,dir_imagen)
{
    Tanque.call(this, x,y,dir_imagen,3);
}

function Proyectil(x,y,dir_imagen)
{
    Objetos_animados.call(this, x,y,dir_imagen);
}

function Objetos_inanimados(x,y,imagen)
{
    this.pos_x=x;
    this.pos_y=y;
    this.imagen = new Image();
    this.imagen.src = imagen;
}

function Muro(x,y, imagen, vida)
{
    Objetos_inanimados.call(this, x,y, imagen);
    this.resistencia = 3;
}

function Borde(x,  y , imagen)
{
    Objetos_inanimados.call(this, x,y, imagen);

}














// ---------------------------------------------




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