//  ************************************************************************************************************************************************  
//  **********  /01-todo-jquery-de-novato-a-experto/02-jquery-ejercicios-ejemplos/seccion09-crea-galeria-jquery/46-galeria/js/galeria.js  **********  
//  ************************************************************************************************************************************************  


document.addEventListener('DOMContentLoaded', () => {


    console.warn('----------  Documento Cargado!!!  ----- ', 'CDN Google - jQuery version:', $.fn.jquery, ' ----------', '\n');

    //  -----  Declaración de Variables  -----
    let fotoActual = 1;
    const numFotos = 6;
    let timer; // Almacenará el intervalo

    //  -----  Referencias al HTML  -----
    const $foto = $("#foto");
    const $izq = $("#izq");
    const $der = $("#der");
    const $texto = $("#texto");

    //  -----  Títulos de las Fotos  -----
    const textos = [
        "1. Partenón",
        "2. Partenón de día",
        "3. Villa Atenience",
        "4. Partenón de noche",
        "5. Atardecer en el mediterráneo",
        "6. Constelación de Andrómeda"
    ];

    //  -----  Inicializar la galería  -----
    iniciarIntervalo(); // Configurar el intervalo
    $("#foto1").html("<img src='/img/fondos/bolaNaranja.fw.png'>");
    $texto.text(textos[fotoActual - 1]);

    //  -----  Atenuar las Flechas la Primera Vez  -----
    $izq.fadeTo(1000, 0.2);
    $der.fadeTo(1000, 0.2);

    //  -----  Click en una de las bolitas  -----
    $("#foto1, #foto2, #foto3, #foto4, #foto5, #foto6").click(function () {
        detenerIntervalo(); // Detener el intervalo
        fotoActual = $(this).attr("data-alt");
        fotoActual--;
        cargaFoto();
    });

    //  -----  Click en la flecha Izquierda  -----
    $izq.click(function () {
        detenerIntervalo();
        fotoActual -= 2;
        if (fotoActual < 0) fotoActual = numFotos - 1;
        cargaFoto();
    });

    //  -----  Click en la flecha Derecha  -----
    $der.click(function () {
        detenerIntervalo();
        cargaFoto();
    });

    //  -----  Hover de las Flechas  -----
    $("#izq, #der").mouseenter(function () {
        $(this).fadeTo(500, 1);
    });
    $("#izq, #der").mouseleave(function () {
        $(this).fadeTo(500, 0.2);
    });

    //  ----------  Declaración de Funciones  ----------

    function iniciarIntervalo() {
        timer = setInterval(cargaFoto, 3000); // Configurar el intervalo
    }

    function detenerIntervalo() {
        clearInterval(timer); // Detener el intervalo
    }

    function cargaFoto() {
        fotoActual++;
        if (fotoActual > numFotos) fotoActual = 1;

        $foto.fadeOut(500, cambiaFoto);
    }

    function cambiaFoto() {
        //  -----  Pintamos todas las bolitas a Gris  -----
        for (let i = 1; i <= numFotos; i++) {
            $("#foto" + i).html("<img src='/img/fondos/bolaGris.fw.png'>");
        }

        //  -----  Cambiamos la bolita gris que toca a Naranja  -----
        $("#foto" + fotoActual).html("<img src='/img/fondos/bolaNaranja.fw.png'>");

        //  -----  Cambiamos la Foto de la Galería  -----
        $foto.attr("src", `/img/fondos/fondo${fotoActual}.jpg`);
        $foto.fadeIn(1000);

        //  -----  Cambiamos el Texto de la Foto  -----
        $texto.text(textos[fotoActual - 1]);
    }

});
