var edificios_destruidos = 0;


// -------------------------------------------  FUNCIONES EXTRA ------------------------------------------------


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

function elemento_en_espacio (pos_x, pos_y, objetos)
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
}

function mover_proyectil(proyectil, direccion, objetos, ctx)
{
    if(direccion=== 37)
    {
        //proyectil.pos_x-=40;
        console.log(espacioLibre(proyectil.pos_x-40,proyectil.pos_y, objetos));

        while(espacioLibre(proyectil.pos_x-40,proyectil.pos_y, objetos))
        {
            console.log("moviendose izquierda");
            ctx.clearRect( proyectil.pos_x, proyectil.pos_y ,40,40);
            proyectil.pos_x-=2;
            ctx.drawImage(proyectil.imagen,proyectil.pos_x, proyectil.pos_y );

        }
        var objeto_encontrado1 = elemento_en_espacio(proyectil.pos_x-40, proyectil.pos_y, objetos);
        if(objeto_encontrado1 instanceof Enemigo || objeto_encontrado1 instanceof Muro || objeto_encontrado1 instanceof Objetivo)
        {
            objeto_encontrado1.disminuir_resistencia(ctx);
            proyectil.estado = false;
            proyectil.pos_x=0;
            proyectil.pos_y=0;
        }
        else
        {
            ctx.clearRect( proyectil.pos_x, proyectil.pos_y ,40,40);
            proyectil.estado = false;
            proyectil.pos_x=0;
            proyectil.pos_y=0;
        }
    }


    else if(direccion===38)
    {
        //proyectil.pos_y -=40;
        console.log(espacioLibre(proyectil.pos_x,proyectil.pos_y-40, objetos));
        while(espacioLibre(proyectil.pos_x,proyectil.pos_y-40, objetos))
        {
            console.log("moviendose arriba");
            ctx.clearRect( proyectil.pos_x, proyectil.pos_y ,40,40);
            proyectil.pos_y -=2;
            ctx.drawImage(proyectil.imagen,proyectil.pos_x, proyectil.pos_y );
        }
        var objeto_encontrado2 = elemento_en_espacio(proyectil.pos_x, proyectil.pos_y-40, objetos);
        if(objeto_encontrado2 instanceof Enemigo || objeto_encontrado2 instanceof Muro || objeto_encontrado2 instanceof Objetivo)
        {
            objeto_encontrado2.disminuir_resistencia(ctx);
            proyectil.estado = false;
            proyectil.pos_x=0;
            proyectil.pos_y=0;
        }
        else
        {
            ctx.clearRect( proyectil.pos_x, proyectil.pos_y ,40,40);
            proyectil.estado = false;
            proyectil.pos_x=0;
            proyectil.pos_y=0;
        }
    }


    else if(direccion===39)
    {
        //proyectil.pos_x +=40;
        console.log(espacioLibre(proyectil.pos_x+40,proyectil.pos_y, objetos));
        while(espacioLibre(proyectil.pos_x+40,proyectil.pos_y, objetos))
        {
            console.log("moviendose derecha");
            ctx.clearRect( proyectil.pos_x, proyectil.pos_y ,40,40);
            proyectil.pos_x +=2;
            ctx.drawImage(proyectil.imagen,proyectil.pos_x, proyectil.pos_y );
        }
        var objeto_encontrado3 =elemento_en_espacio(proyectil.pos_x+40, proyectil.pos_y, objetos);
        if(objeto_encontrado3 instanceof Enemigo || objeto_encontrado3 instanceof Muro || objeto_encontrado3 instanceof Objetivo)
        {
            objeto_encontrado3.disminuir_resistencia(ctx);
            proyectil.estado = false;
            proyectil.pos_x=0;
            proyectil.pos_y=0;
        }
        else
        {
            ctx.clearRect( proyectil.pos_x, proyectil.pos_y ,40,40);
            proyectil.estado = false;
            proyectil.pos_x=0;
            proyectil.pos_y=0;
        }
    }







    else if(direccion===40)
    {
        //proyectil.pos_y +=40;
        console.log(espacioLibre(proyectil.pos_x,proyectil.pos_y+40, objetos));
        while(espacioLibre(proyectil.pos_x,proyectil.pos_y+40, objetos))
        {
            console.log("moviendose abajo");
            ctx.clearRect( proyectil.pos_x, proyectil.pos_y ,40,40);
            proyectil.pos_y +=2;
            ctx.drawImage(proyectil.imagen,proyectil.pos_x, proyectil.pos_y );
        }
        var objeto_encontrado4 = elemento_en_espacio(proyectil.pos_x, proyectil.pos_y+40, objetos);
        if(objeto_encontrado4 instanceof Enemigo || objeto_encontrado4 instanceof Muro || objeto_encontrado4 instanceof Objetivo)
        {
            objeto_encontrado4.disminuir_resistencia(ctx);
            proyectil.estado = false;
            proyectil.pos_x=0;
            proyectil.pos_y=0;
        }
        else
        {
            ctx.clearRect( proyectil.pos_x, proyectil.pos_y ,40,40);
            proyectil.estado = false;
            proyectil.pos_x=0;
            proyectil.pos_y=0;
        }
    }
}


// ------------------------------------------------ CLASES ------------------------------------------

function Objetos_animados(x,y,dir_imagen)
{
    this.imagen = new Image();
    this.imagen.src = dir_imagen;
    this.pos_x= x;
    this.pos_y= y;
    this.pos_x2= x;
    this.pos_y2= y;
    this.estado=true;
    this.huboCambio = false;
}



function Tanque(x,y,dir_imagen,vida)
{
    Objetos_animados.call(this, x,y,dir_imagen);
    this.vida=vida;
    this.direccion=40;
    this.imagen_proyectil="";
    this.objetivosDestruidos=0;


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

function Aliado (x,y)
{
    this.imagenes = [ "imagenes/aliado/izquierda.png",  "imagenes/aliado/derecha.png",  "imagenes/aliado/arriba.png",  "imagenes/aliado/abajo.png"];
    Tanque.call(this, x,y,this.imagenes[2],3)

    this.accion = function (direccion, objetos, ctx)
    {

        function borrar_rastro(obj)
        {
            obj.huboCambio =true;
            ctx.clearRect( obj.pos_x, obj.pos_y ,40,40);
        }
        if(direccion===39)
        {
            console.log("Derecha");
            this.imagen.src = this.imagenes[1];
            this.imagen_proyectil ="imagenes/proyectiles/derecha.png";
            this.direccion=direccion;
            if(this.pos_x<520 && espacioLibre(this.pos_x+40, this.pos_y, objetos))
            {
                borrar_rastro(this);
                this.pos_x+= 40;
            }
            ctx.drawImage(this.imagen,this.pos_x, this.pos_y );
        }
        else if(direccion===37 )
        {
            console.log("Izquierda");
            this.imagen.src = this.imagenes[0];
            this.imagen_proyectil="imagenes/proyectiles/izquierda.png";
            this.direccion=direccion;
            if(this.pos_x>40 && espacioLibre(this.pos_x-40, this.pos_y, objetos))
            {
                borrar_rastro(this);
                this.pos_x-= 40;
            }
            ctx.drawImage(this.imagen,this.pos_x, this.pos_y );
        }
        else if(direccion===38)
        {
            console.log("Arriba");
            this.imagen.src = this.imagenes[2];
            this.imagen_proyectil="imagenes/proyectiles/arriba.png";
            this.direccion=direccion;
            if(this.pos_y>40 && espacioLibre(this.pos_x, this.pos_y-40, objetos))
            {
                borrar_rastro(this);
                this.pos_y-=40;
            }
            ctx.drawImage(this.imagen,this.pos_x, this.pos_y );

        }
        else if (direccion === 40)
        {
            console.log("Abajo");
            this.imagen_proyectil ="imagenes/proyectiles/abajo.png";
            this.imagen.src = this.imagenes[3];
            this.direccion=direccion;
            if(this.pos_y<520 && espacioLibre(this.pos_x, this.pos_y+40, objetos))
            {
                borrar_rastro(this);
                this.pos_y+=40;
            }
            ctx.drawImage(this.imagen,this.pos_x, this.pos_y );
        }


        else if(direccion===88)
        {
            this.disparar(objetos, ctx);
            ctx.drawImage(this.imagen, this.pos_x, this.pos_y);
        }
    };

    this.disparar = function (objetos, pantalla)
    {
        var nuevo_proyectil = new ProyectilAliado(this.pos_x, this.pos_y, this.imagen_proyectil);
        objetos.push(nuevo_proyectil);
        Concurrent.Thread.create(mover_proyectil,nuevo_proyectil, this.direccion, objetos,pantalla);
    };
}

function ProyectilAliado(x,y,imagen)
{

    this.imagen = new Image();
    this.imagen.src = imagen;
    this.pos_x=x;
    this.pos_y=y;
    this.pos_x2=x;
    this.pos_y2=y;
    this.estado = true;
}


function Objetos_inanimados(x,y,imagen)
{
    this.huboCambio = false;
    this.pos_x=x;
    this.pos_y=y;
    this.estado = true;
    this.imagen = new Image();
    this.imagen.src = imagen;
}

function Borde(x,y)
{
    Objetos_inanimados.call(this, x,y, "imagenes/estructuras/pared.jpg");
}

function Muro(x,y)
{
    Objetos_inanimados.call(this, x,y,"imagenes/estructuras/pared.jpg");
    this.resistencia = 2;

    this.disminuir_resistencia = function (pantalla)
    {
        console.log("REsistencia disminuida");
        this.resistencia --;
        if (this.resistencia===0)
        {
            pantalla.clearRect( this.pos_x, this.pos_y ,40,40);
            this.estado=false;
            this.pos_x=0;
            this.pos_y=0;
        }
        else
        {
            pantalla.drawImage(this.imagen, this.pos_x, this.pos_y);
        }
    }
}


function Objetivo(x,  y , imagen, pantalla)
{
    Objetos_inanimados.call(this, x,y, imagen);
    this.resistencia = 3;
    this.pantalla = pantalla;


    this.disminuir_resistencia = function (pantalla)
    {
        console.log("REsistencia disminuida");
        this.resistencia --;
        if (this.resistencia===0)
        {
            pantalla.clearRect( this.pos_x, this.pos_y ,40,40);
            this.pos_x=0;
            this.pos_y=0;
            this.estado=false;
            edificios_destruidos++;
        }
        else
        {
            pantalla.drawImage(this.imagen, this.pos_x, this.pos_y);
        }
    }
}









function NuevoJuego()
{

    alert("Para moverse preciones las flechas");
    alert("Para disparar precione x");
    alert("Para reiniciar el juego presione el boton Iniciar");
    var jugando = true;
    var objetos_graf = [];

    var cnv = document.getElementById('lienzo');
    var ctx = cnv.getContext('2d');
    ctx.clearRect(0,0,600,600);
    var jugador = new Aliado(40,520);
    objetos_graf.push(jugador);
    // Crea los muros que no se pueden destruir
    function crearBordes()
    {
        for(i=0; i<15; i++)
        {
            var m11 = new Borde(i*40,0);
            var m21 = new Borde(i*40,560);
            objetos_graf.push(m11);
            objetos_graf.push(m21);
        }
        for(i=1; i<14; i++)
        {
            var mi = i*40;
            var m1 = new Borde(0, mi);
            var m2 = new Borde(560, mi);
            objetos_graf.push(m1);
            objetos_graf.push(m2);
        }
    }
    // Crea los muros internos que si se pueden destruir
    function crearMuros()
    {
        var contador = 20;
        while (contador>0)
        {
            var x = Math.trunc(Math.random()*(14-1)+1)*40;
            var y = Math.trunc(Math.random()*(14-1)+1)*40;
            if(espacioLibre(x, y, objetos_graf))
            {
                var nuevo = new Muro(x,y);
                objetos_graf.push(nuevo);
                contador--;
            }
        }
    }
    // Crea los objetivos los cuales se pueden destruir con los disparos
    function crearObjetivos()
    {
        var contador =5;
        while (contador>0)
        {
            var x = Math.trunc(Math.random()*(14-1)+1)*40;
            var y = Math.trunc(Math.random()*(14-1)+1)*40;
            if(espacioLibre(x, y, objetos_graf))
            {
                // se cambia la imagen en ramdom 1, 2
                var nuevo = new Objetivo(x,y,"imagenes/estructuras/objetivo.jpg");
                objetos_graf.push(nuevo);
                contador--;
            }
        }
    }

    crearMuros();
    crearBordes();
    crearObjetivos();
    function  moverJugador(tecla)
    {
        jugador.accion(tecla.keyCode, objetos_graf, ctx);
    }

    for(i=0; i<objetos_graf.length; i++)
    {
        ctx.clearRect( objetos_graf[i].pos_x2, objetos_graf[i].pos_y2 ,40,40);
        ctx.drawImage(objetos_graf[i].imagen, objetos_graf[i].pos_x, objetos_graf[i].pos_y);
    }
    document.onkeydown = moverJugador;
}






