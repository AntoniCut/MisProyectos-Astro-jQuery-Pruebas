//  -----------------------------------------------------
//  ----------  /astro-jquery-pruebas  ------------------
//  ----------  /src/scripts/jQueryGaleria.js  ----------
//  -----------------------------------------------------


import $ from 'jquery';
import 'astro-jquery';


//  ------------------------------------------------------
//  ----------  FUNCIONES Y VARIABLES GLOBALES  ----------
//  ------------------------------------------------------


//  -----  Variables globales  -----

let timer = null; // Almacenará el ID de setTimeout
let fotoActual = 1;
const numFotos = 6;


//  -----  Referencias html al DOM (inicializan al cargar `jQueryGaleria`)  -----
let $foto, $izq, $der, $texto, $bolitas;


//  -----  textos de la galeria  -----
const textos = [
    "1. Partenón",
    "2. Partenón de día",
    "3. Villa Ateniense",
    "4. Partenón de noche",
    "5. Atardecer en el Mediterráneo",
    "6. Constelación de Andrómeda",
];


//  ----------  Función para iniciar el temporizador con `setTimeout`  ----------
function iniciarTemporizador() {

    detenerTemporizador(); // Asegurarse de que no haya temporizadores activos

    timer = setTimeout(() => {
        cargaFoto();                // Cambiar la foto
        iniciarTemporizador();      // Programar el siguiente ciclo
    }, 3000);
}



//  ----------  Función para detener el temporizador  ----------
function detenerTemporizador() {
    if (timer) {
        clearTimeout(timer); // Detener el temporizador
        timer = null;
        console.log("Temporizador detenido");
    }
}



//  ----------  Función para cargar la foto siguiente  ----------
function cargaFoto() {

    fotoActual++;
    if (fotoActual > numFotos) fotoActual = 1;

    //$foto.fadeOut(500, cambiaFoto);
    $foto.fadeTo(1000, 1, cambiaFoto);

}



//  ----------  Función para cambiar la foto  ----------
function cambiaFoto() {

    //  -----  Pintar todas las bolitas de gris con fadeTo  -----
    $bolitas.each(function () {
        $(this).html("<img src='/img/fondos/bolaGris.fw.png'>");
    });

    //  -----  Cambiar la bolita activa a naranja  -----
    $(`#foto${fotoActual}`).html("<img src='/img/fondos/bolaNaranja.fw.png'>");

    //  -----  Cambiar la foto y el texto  -----
    $foto.attr("src", `/img/fondos/fondo${fotoActual}.jpg`);
    $foto.fadeIn(1000);
    $texto.text(textos[fotoActual - 1]);

    console.log("fotoActual = ", fotoActual);
}



//  ------------------------------------------------------------------
//  ----------  FUNCIÓN PRINCIPAL  --  INICIALIZAR GALERIA  ----------
//  ------------------------------------------------------------------

export const jQueryGaleria = () => {


    console.warn("---------- Documento Cargado ----------", "jQuery version:", $.fn.jquery);

    //  -----  Inicializar referencias HTML al DOM  -----
    $foto = $("#foto");
    $izq = $("#izq");
    $der = $("#der");
    $texto = $("#texto");
    $bolitas = $("#foto1, #foto2, #foto3, #foto4, #foto5, #foto6");

    //  -----  INICIO DE LA GALERIA  -----
    iniciarTemporizador(); // Iniciar temporizador

    //  -----  Renderizar la bolita1 y texto1 al inicio  -----
    $("#foto1").html("<img src='/img/fondos/bolaNaranja.fw.png'>");
    $texto.text(textos[fotoActual - 1]);

    //  -----  atenuamos las flechas -----
    $izq.fadeTo(1000, 0.2);
    $der.fadeTo(1000, 0.2);


    //  -----  Eventos para las bolitas  -----
    $bolitas.on("click", function () {
        detenerTemporizador();
        fotoActual = $(this).attr("data-alt");
        fotoActual--;
        cargaFoto();
    });


    //  -----  Evento para la flecha izquierda  -----
    $izq.on("click", function () {
        detenerTemporizador();
        fotoActual -= 2;
        if (fotoActual < 0) fotoActual = numFotos - 1;
        cargaFoto();
    });


    //  -----  Evento para la flecha derecha  -----
    $der.on("click", function () {
        detenerTemporizador();
        cargaFoto();
    });

    //  -----  Efectos hover para las flechas  -----
    $("#izq, #der")
        .on("mouseenter", function () {
            $(this).fadeTo(500, 1);
        })
        .on("mouseleave", function () {
            $(this).fadeTo(500, 0.2);
        });
};



//  ----------  Función para limpiar la galería al salir de la página  ----------
export function limpiarGaleria() {

    detenerTemporizador(); // Detener el temporizador activo
    console.log("Limpieza de eventos y recursos completada.");
}
