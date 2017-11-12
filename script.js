
/*
Notas:
1) Lagasos en el tanque

    Las imagenes cuando se cargan por primera ves no aparecen entonces
    lo que sujiero es cargar todo para quede en cache y asi no tener los
    lagasos que pega el mae cuando cambia de direccion (esque ahi carga la imagen).

 2)

  */







function jugar()
{
    document.getElementById("boton1").hide=true;
    var objetos_graf = [];
    var lista_objetos_activos=[];
    var enemigos = [];


    var jugador = new Aliado(40,520, "imagenes/aliado/arriba.png");
    lista_objetos_activos.push(jugador);
    objetos_graf.push(jugador);

    function crearBordes()
    {
        for(i=0; i<15; i++)
        {
            var m11 = new Borde(i*40,0, "imagenes/estructuras/pared.jpg");
            var m21 = new Borde(i*40,560, "imagenes/estructuras/pared.jpg");
            objetos_graf.push(m11);
            objetos_graf.push(m21);
        }
        for(i=1; i<14; i++)
        {
            var mi = i*40;
            var m1 = new Borde(0, mi, "imagenes/estructuras/pared.jpg");
            var m2 = new Borde(560, mi, "imagenes/estructuras/pared.jpg");
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
        var contador = 20;

        while (contador>0)
        {
            var x = Math.trunc(Math.random()*(14-1)+1)*40;
            var y = Math.trunc(Math.random()*(14-1)+1)*40;
            if(espacioLibre(x, y, objetos_graf))
            {
                var nuevo = new Muro(x,y,"imagenes/estructuras/pared.jpg");
                objetos_graf.push(nuevo);
                lista_objetos_activos.push(nuevo);
                contador--;
            }
        }
    }

    function crearObjetivos()
    {
        var contador =5;

        while (contador>0)
        {
            var x = Math.trunc(Math.random()*(14-1)+1)*40;
            var y = Math.trunc(Math.random()*(14-1)+1)*40;

            if(espacioLibre(x, y, objetos_graf))
            {
                var nuevo = new Objetivo(x,y,"imagenes/estructuras/objetivo.jpg");
                objetos_graf.push(nuevo);
                lista_objetos_activos.push(nuevo);
                contador--;
            }
        }
    }


    function crearEnemigos()
    {
        var enemigos = ["imagenes/enemigo1.png", "imagenes/enemigo2.png", "imagenes/enemigo1.png"];
        for(i=0; i<10; i++)
        {
            var x = Math.trunc(Math.random()*(14-1)+1)*40;
            var y = Math.trunc(Math.random()*(14-1)+1)*40;
            if(espacioLibre(x, y, objetos_graf))
            {
                console.log("Creoo un objetivo");
                var nuevo = new Enemigo(x,y,"imagenes/estructuras/pared.jpg",1);
                objetos_graf.push(nuevo);
                lista_objetos_activos.push(nuevo);
                enemigos.push(nuevo);
            }
            else{
                i--;
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
    crearObjetivos();



    function limpieza()
    {
        var tam = objetos.length;
        for(i=0; i<tam; i++)
        {
            ctx.drawImage(objetos[i].imagen, objetos[i].pos_x, objetos[i].pos_y );
        }

    }
    function anim(objetos)
    {
        bandera = true;
        while (bandera)
        {
            console.log(objetos);
            ctx.clearRect(0, 0, 600, 600);
            ctx.drawImage(fondo,0, 0);
            var tam = objetos.length;
            for(i=0; i<tam; i++)
            {
                ctx.drawImage(objetos[i].imagen, objetos[i].pos_x, objetos[i].pos_y );
            }
        }
    }

    function  moverJugador(tecla)
    {
        jugador.mover(tecla.keyCode, objetos_graf);
    }
    anim(objetos_graf);
}




//var elementoEliminado = frutas.splice(pos, 1); // así es como se elimina un elemento



function Objetos_animados(x,y,dir_imagen)
{

    this.imagen = new Image();
    this.imagen.src = dir_imagen;
    this.pos_x= x;
    this.pos_y= y;
    this.estado=true;


    this.espacioLibre = function (pos_x, pos_y, objetos)
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

    this.elemento_en_espacio = function (pos_x, pos_y, objetos)
    {
        var cantidad = objetos.length;
        for(i=0; i<cantidad; i++)
        {
            if(pos_x === objetos[i].pos_x && pos_y===objetos[i].pos_y)
            {
                return objetos[i];
            }
        }
        return false;
    };
}





function Tanque(x,y,dir_imagen,vida)
{
    Objetos_animados.call(this, x,y,dir_imagen);
    this.vida=vida;
    this.direccion=40;
    this.imagen_proyectil="";

    this.mover = function (direccion, objetos)
    {
        if(direccion===39)
        {
            this.imagen.src = this.imagenes[1];
            this.imagen_proyectil ="imagenes/proyectiles/derecha.png";
            this.direccion=direccion;
            if(this.pos_x<520 && this.espacioLibre(this.pos_x+40, this.pos_y, objetos))
            {
                this.pos_x+= 40;
            }
        }
        else if(direccion===37 )
        {
            this.imagen.src = this.imagenes[0];
            this.imagen_proyectil="imagenes/proyectiles/izquierda.png";
            this.direccion=direccion;
            if(this.pos_x>40 && this.espacioLibre(this.pos_x-40, this.pos_y, objetos))
            {
                this.pos_x-= 40;
            }
        }
        else if(direccion===38)
        {
            this.imagen.src = this.imagenes[2];
            this.imagen_proyectil="imagenes/proyectiles/arriba.png";
            this.direccion=direccion;
            if(this.pos_y>40 && this.espacioLibre(this.pos_x, this.pos_y-40, objetos))
            {
                this.pos_y-=40;
            }

        }
        else if (direccion === 40)
        {
            this.imagen_proyectil ="imagenes/proyectiles/abajo.png";
            this.imagen.src = this.imagenes[3];
            this.direccion=direccion;
            if(this.pos_y<520 && this.espacioLibre(this.pos_x, this.pos_y+40, objetos))
            {
                this.pos_y+=40;
            }
        }
        else if(direccion===88)
        {
            this.disparar(objetos);
        }
    };

    this.disparar = function (objetos)
    {
        console.log("Disparando");
        var proyectil = new ProyectilAliado(this.pos_x,this.pos_y,this.direccion, this.imagen_proyectil, objetos);
        objetos.push(proyectil);
    };


    this.disminuir_resistencia = function ()
    {
        this.resistencia --;
        if (this.resistencia===0)
        {
            this.estado=false;
        }
    }
}

function Enemigo(x,y,dir_imagen)
{
    Tanque.call(this, x,y,dir_imagen,1);
}

function Aliado (x,y,dir_imagen)
{
    this.imagenes = [ "imagenes/aliado/izquierda.png",  "imagenes/aliado/derecha.png",  "imagenes/aliado/arriba.png",  "imagenes/aliado/abajo.png"];
    Tanque.call(this, x,y,dir_imagen,3)
}

function ProyectilAliado(x,y,direccion,imagen, objetos)
{
    Objetos_animados.call(this, x,y, imagen);
    if(direccion=== 37)
    {
        while(this.espacioLibre(x, y, objetos))
        {
            this.pos_x-=40;
        }
    }
    else if(direccion===38)
    {
        while(this.espacioLibre(x, y, objetos))
        {
            this.pos_y -=40;
        }
        var objeto_encontrado = this.elemento_en_espacio(this.pos_x, this.pos_y, objetos);
        if(objeto_encontrado instanceof Enemigo || objeto_encontrado instanceof Muro || objeto_encontrado instanceof Objetivo)
        {
            objeto_encontrado.disminuir_resistencia();
        }
    }
    else if(direccion===39)
    {
        while(this.espacioLibre(x, y, objetos))
        {
            this.pos_x +=40;
        }
    }
    else if(direccion===40)
    {
        while(this.espacioLibre(x, y, objetos))
        {
            this.pos_y +=40;
        }
    }
}




function Objetos_inanimados(x,y,imagen)
{
    this.pos_x=x;
    this.pos_y=y;
    this.estado = true;
    this.imagen = new Image();
    this.imagen.src = imagen;
}


function Borde(x,  y , imagen)
{
    Objetos_inanimados.call(this, x,y, imagen);
}



function Muro(x,y, imagen)
{
    Objetos_inanimados.call(this, x,y, imagen);
    this.resistencia = 2;

    this.disminuir_resistencia = function ()
    {
        this.resistencia --;
        if (this.resistencia===0)
        {
            this.estado=false;
        }
    }
}

function Objetivo(x,  y , imagen)
{
    Objetos_inanimados.call(this, x,y, imagen);
    this.resistencia = 3;
    this.disminuir_resistencia = function ()
    {
        this.resistencia --;
        if (this.resistencia===0)
        {
            this.estado=false;
        }
    }
}






