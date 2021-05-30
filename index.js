/******************************/
/***PARAMETROS PARA EL JUEGO*****/
var oJuego = new Object() ; //instanciamos un nuevo objeto
oJuego.columnas = 4; //establecemos el número de columnas que tendrá el tablero
oJuego.filas = 4; //establecermos el número de filas que tendrá el tablero
oJuego.extension=".png"; //extensión para TODAS las imagenes
oJuego.ruta     ="img/"; //directorio dónde seguardan las imagenes
oJuego.pulsada  = new Array (0,0); //array para guardar las parejas de cartas al pulsar
oJuego.intentos = 0; //contador de intentos
oJuego.aciertos = 0; //contador de aciertos
var MAXIMO_FICHAS = oJuego.filas * oJuego.columnas; //el máximo de fichas para el tablero
var img = new Array(); //array para guardar las imagenes
var enPausa = false; //pause para esperar a pulsar la segunda carta
/********************************/
/************FUNCIONES***********/
//Función para cargar todas las imagenes. Le damos un tamaño de 100x100
//Guardamos cada imagen dentro del array para guardar las imagenes
function cargarImagenes(){
    for( i = 0; i < MAXIMO_FICHAS;i++){
           aImagenes[i] = new Image(100,100);
        aImagenes[i].src = oJuego.ruta + i + oJuego.extension;
    }
}

//------------------------------------
/*
fetch(
    "https://www.googleapis.com/customsearch/v1?q=islandia+paisajes&num=10&key=AIzaSyDbt5JKmiQ6AijD3QyPyEXSNZVzROofMAA&cx=f219451ebd396dd3e&fileType=.jpg"
  )
    .then((res) => res.json())
    .then(function RecogerDatos(datos) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < datos.items[i].pagemap.cse_image.length; j++) {
          img[i] = datos.items[i].pagemap.cse_image[j].src;
        }
      }
      for (let k = 5; k < 10; k++) {
        for (let l = 0; l < 1; l++) {
          img[k] = datos.items[k].pagemap.cse_image[l].src;
        }
      }
      console.log(img);
       document.getElementById(
        "mostrar"
      ).innerHTML = `<img src="${img[0]}" alt="" height="100px" width="100px">
      <img src="${img[1]}" alt="" height="100px" width="100px">
      <img src="${img[2]}" alt="" height="100px" width="100px">
      <img src="${img[5]}" alt="" height="100px" width="100px">
      <img src="${img[6]}" alt="" height="100px" width="100px">
      <img src="${img[7]}" alt="" height="100px" width="100px">
      <img src="${img[8]}" alt="" height="100px" width="100px">
      <img src="${img[9]}" alt="" height="100px" width="100px">` ;
    })*/

  
  //-----------------------prueba Rocío
  
  
  
  
  
  //-----------------------prueba Jorge
  
  
  
  
  
  
  //----------------------prueba Blas
  
  //------------------------------------ BUSCAR FORMA DE MOSTRAR LAS IMÁGENES DE LA API-------------------
  function cargarImagenes() {
    for (i = 0; i < MAXIMO_FICHAS; i++) {
      img[i] = new Image(100, 100);
      img[i].src = oJuego.ruta + i + oJuego.extension;
    }
  }


/*********************************/
//functión para pintar en la página el tablero
//por defecto se muestra en todas la celdas la imagen llamada cruz.png
//se guardan todos los elementos de la tabla dentro de la variable salida
//que se muestra al final de la función.
function mostrarTablero(){
    //mostramos los contadores
    document.getElementById("movimientos").innerHTML = oJuego.intentos;
    document.getElementById("aciertos").innerHTML    = oJuego.aciertos;
    var salida = "<table>\n";
         
   for (i=0; i < MAXIMO_FICHAS ; i++) {
        if (i % oJuego.columnas == 0 ){
            salida += "\n<tr>"
        }         
        salida += '<td id="carta_'+ i + '"><a href="" onclick="return false" onmousedown="mostrar(' +i + ')" onmouseup="comprobar('+i+')" >'+
        '<img src="' + oJuego.ruta+ "cruz" + oJuego.extension + '"></a></td>';  
    }
    salida += "</table>";
    document.getElementById("tablero").innerHTML = salida;
    
}


/* salida += '<td id="carta_'+ i + '"><a href="" onclick="return false" onmousedown="mostrar(' +i + ')" onmouseup="comprobar('+i+')" >'+
                  '<img src="' + oJuego.ruta+ "cruz" + oJuego.extension + '"></a></td>'; */
                  
/*********************************/
//functión para empezar y establecer los parámetros antes de mostrar el tablero
function empezarJuego(){
    var nUno, nDos, nTemp;
    oJuego.pulsada  = new Array (-1,-1); //iniciamos en -1 para solo poder usar las posiciones 1 y 0
    oJuego.intentos = 0;
    oJuego.aciertos = 0;
    // ordenar array ()
    oJuego.cartas = new Array (MAXIMO_FICHAS)
    for (i=0; i < MAXIMO_FICHAS ; i++ ){
           oJuego.cartas[i] = i;
    }
    // desordenar el array()
    i = 100 ;
    while (i--){
        nUno = azar(); //aleatorio para separar las parejas
        nDos = azar(); //aleatorio para separar la pareja de la anterior
        if (nDos != nUno ){ //establecemos el orden
              nTemp = oJuego.cartas[nUno]
              oJuego.cartas[nUno] = oJuego.cartas[nDos]
              oJuego.cartas[nDos] = nTemp;
          }
    }
    mostrarTablero(); //mostramos el tablero gracias a la función mostrarTablero
}
/*********************************/
// funciones varias para el juego
function azar(){  
    return Math.floor(Math.random()*MAXIMO_FICHAS);
}
/*********************************/
//función para comprobar si se han pulsado una o dos cartas
function soloImpar(n){
    return (n % 2 == 0 ? n : n - 1);
}
/*********************************/
//functión para mostrar cada una de las imagenes
function mostrar(nFicha){
   if (!enPausa){
       //buscamos la imagen en el array
       if ( document.images[nFicha].src.indexOf(oJuego.ruta + "cruz"+ oJuego.extension)!=-1 ) {
           document.images[nFicha].src = img[ oJuego.cartas[nFicha] ].src;
           if ( oJuego.pulsada[0] == -1 )
               oJuego.pulsada[0]= nFicha;
           else 
               oJuego.pulsada[1]= nFicha;
       } else {
         //en caso de que se pulse una imagen ya girada    
         console.log("Pulsa sobre una imagen sin pareja ... !!");
       }
    }
}
/*********************************/
//functión para volver a dar la vuelta a las cartas
function quitarPausa(){
    enPausa= false;
    document.images[oJuego.pulsada[0]].src = oJuego.ruta + "cruz"+ oJuego.extension;
    document.images[oJuego.pulsada[1]].src = oJuego.ruta + "cruz"+ oJuego.extension;
   // volver las teclas 
    oJuego.pulsada[0] = -1;
    oJuego.pulsada[1] = -1; 
}
/*********************************/
function comprobar(){
    // comprobar dos teclas    
    if( enPausa || oJuego.pulsada[1] == -1){
        return ;
   }
    
    oJuego.intentos++; //añadimos uno al contador
    //en caso de acertar 
    if ( soloImpar(oJuego.cartas[oJuego.pulsada[0]]) == soloImpar(oJuego.cartas[oJuego.pulsada[1]]) ) { 
        oJuego.aciertos++; //añadimos uno al contador aciertos
        //si el número de aciertos multiplicado por 2 es igual al número de fichas
        //se da por teminado el juego
        if ( oJuego.aciertos * 2 == MAXIMO_FICHAS ) {
            //Paramos el cronómetro
            detenerse()
            //mensaje de final de juego
            document.getElementById("feedback").innerHTML= `<p>¡¡Enhorabuena!!</p><p>Estos son tus resultados:</p> <p>Número de intentos: ${oJuego.intentos}</p>
                <p>Tiempo total de juego: ${contador_m}: ${contador_s-1}</p>`;
        }
        oJuego.pulsada[0] = -1;
        oJuego.pulsada[1] = -1;
    } else {
       enPausa= true; //activamos pause
       setTimeout(quitarPausa,1000); //establecemos el pause en 1 segundo para darse la vuelta las imagenes cuando no coincidan
    }
    
    //mostramos los contadores
    document.getElementById("movimientos").innerHTML = oJuego.intentos;
    document.getElementById("aciertos").innerHTML    = oJuego.aciertos;
}
/*********************************/
//Evento que al cargarse la ventana carga las funciones cargarImagenes, empezarJuego y cargar el reloj
window.onload = function () { 
    cargarImagenes();
    empezarJuego();
    bienvenida();
}
/********************************/
//esta función hace funcionar el reloj desde que se carga la página
function carga(){
        contador_s =0;
        contador_m =0;
            s = document.getElementById("segundos");
            m = document.getElementById("minutos");
                cronometro = setInterval(
                        function(){
                        if(contador_s==60)
                                {
                                    contador_s=0;
                                    contador_m++;
                                    m.innerHTML = contador_m;
                                    if(contador_m==60)
                                        {
                                        contador_m=0;
                                        }
                                }
                        s.innerHTML = contador_s;
                            contador_s++;
                        }
                    ,1000);
        }
/***********************************/
//Esta función detiene el cronómetro
    var cronometro;
    function detenerse(){
           clearInterval(cronometro);
    }
/***************************************/
//Función de bienvenida y que inicia al reloj
function bienvenida(){
    console.log("Inicio del juego");
    carga();
}