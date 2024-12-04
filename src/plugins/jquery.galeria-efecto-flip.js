//  ------------------------------------------------------------------
//  ----------  /astro-jquery-pruebas/  ------------------------------
//  ----------  /src/plugins/jquery.galeria-efecto-flip.js  ----------
//  ------------------------------------------------------------------


import $ from 'jquery';
import 'astro-jquery';
import { jQueryFlipPlugins } from './jquery.flip';



export const jQueryGaleriaEfectoFlipPlugins = () => {


    console.log('jQuery cargado:', !!window.jQuery);
    console.log('Plugins registrados:', Object.keys($.fn));

    //  -----  Llamar al Plugins jquery.flip.js para que este disponible  -----
    jQueryFlipPlugins();


    (function () {


        $.fn.galeriaEfectoFlip = function (options) {


            console.warn('----------  Plugin jQuery Galeria Efecto Flip Cargado!!!  ---------- \n');


            //  ---------------------------------------------------------
            //  ----------  Opciones por defecto y extendidas  ----------
            //  ---------------------------------------------------------
            const defaults = {
                numFondos: 6,
                efectosArray: ['lr', 'rl', 'tb', 'bt'],
                intervalo: 2000,
                rutaFondos: '/img/fondos',
                rutaBotones: '/img/fondos/botones',
                widthImg: 600,
                heightImg: 400
            };

            const settings = $.extend({}, defaults, options);


            //  ------------------------------------------
            //  ----------  Variables internas  ----------
            //  ------------------------------------------
            let fondo = 1;
            let banderaCiclo = true;
            let timer;

            //  -----  Precarga de las imágenes  -----
            const precargarImagenes = (rutaFondos, numFondos) => {
                for (let i = 1; i <= numFondos; i++) {
                    const img = new Image();
                    img.src = `${rutaFondos}fondo${i}.jpg`;
                    console.log(img.src);
                }
            };

           
            //  ----------  Crear HTML  ----------
            const crearHTML = ($galeria) => {

                const $foto = $("<div>", { id: "foto" });

                const $imgFoto = $("<img>", {
                    src: `${settings.rutaFondos}fondo1.jpg`,
                    width: `${settings.widthImg}px`,
                    height: `${settings.heightImg}px`
                });

                $foto.append($imgFoto);

                const $botoneraDiv = $("<div>", {
                    class: "botonera",
                    //style: `width: ${settings.widthImg}px;`
                });

                const botones = [
                    { id: "inicio", src: `${settings.rutaBotones}inicio.png`, alt: "inicio" },
                    { id: "atras", src: `${settings.rutaBotones}atras.png`, alt: "atrás" },
                    { id: "play", src: `${settings.rutaBotones}play.png`, alt: "play" },
                    { id: "stop", src: `${settings.rutaBotones}stop.png`, alt: "stop" },
                    { id: "adelante", src: `${settings.rutaBotones}adelante.png`, alt: "adelante" },
                    { id: "fin", src: `${settings.rutaBotones}fin.png`, alt: "último" }
                ];


                botones.forEach(boton => {
                    const $botonDiv = $("<div>", {
                        class: "boton",
                        id: boton.id
                    });

                    const $imgBoton = $("<img>", {
                        src: boton.src,
                        alt: boton.alt,
                        width: "50px",
                        height: "40px"
                    });

                    $botonDiv.append($imgBoton);
                    $botoneraDiv.append($botonDiv);
                });

                $galeria.append($foto, $botoneraDiv);

                return {
                    $foto,
                    $imgFoto,
                    $botoneraDiv,
                    $botones: botones.map(b => $(`#${b.id}`))
                };
            };



            //  --------------------------------------------
            //  ----------  Lógica de la galería  ----------
            //  --------------------------------------------

            const voltea = ($foto) => {

                //console.log(fondo);
                const archivo = `fondo${fondo}.jpg`;
                const efecto = Math.floor(Math.random() * settings.efectosArray.length);


                //  -------------------------------------------------------
                //  ----- Aplicar el efecto flip con el otro plugins  -----
                //  -------------------------------------------------------
                $foto.flip({
                    direction: settings.efectosArray[efecto],
                    //color: "#ffffff",
                    color: "#B1B1B1",
                    onEnd: function () {
                        // Cambiar la imagen después del efecto flip
                        $foto.html(`<img src='${settings.rutaFondos}${archivo}' width='${settings.widthImg}px' height='${settings.heightImg}px' />`);
                    }
                });


                // Actualizar fondo para el siguiente ciclo
                if (banderaCiclo) {
                    fondo = fondo < settings.numFondos ? fondo + 1 : 1;
                    timer = setTimeout(() => voltea($foto), settings.intervalo);
                }
            };


            const verificaCiclo = ($play, $stop) => {
                $play.show();
                $stop.hide();
                if (banderaCiclo) {
                    clearTimeout(timer);
                    banderaCiclo = false;
                }
            };


            const avanza = ($play, $stop, $foto) => {

                verificaCiclo($play, $stop);
                fondo = fondo < settings.numFondos ? fondo + 1 : 1;
                voltea($foto);

            };


            const atras = ($play, $stop, $foto) => {
                verificaCiclo($play, $stop);
                fondo = fondo > 1 ? fondo - 1 : settings.numFondos;
                voltea($foto);
            };


            const inicia = ($play, $stop, $foto) => {
                verificaCiclo($play, $stop);
                fondo = 1;
                voltea($foto);
            };


            const ultimo = ($play, $stop, $foto) => {
                verificaCiclo($play, $stop);
                fondo = settings.numFondos;
                voltea($foto);
            };


            const ciclo = ($play, $stop, $foto) => {
                banderaCiclo = true;
                continuaCiclo($foto);
                $play.hide();
                $stop.show();
            };


            const stop = ($play, $stop) => {
                verificaCiclo($play, $stop);
            };


            const continuaCiclo = ($foto) => {

                fondo = fondo < settings.numFondos ? fondo + 1 : 1;
                voltea($foto);  // Llamar a voltea para actualizar la imagen
            };


            //  ----------  Inicializar el plugin  ----------
            return this.each(function () {

                const $galeria = $(this);

                // Llamar a la precarga al iniciar
                precargarImagenes(settings.rutaFondos, settings.numFondos);

                //  -----  Crear HTML  -----
                const { $foto, $imgFoto, $botoneraDiv, $botones } = crearHTML($galeria);

                //  -----  Iniciamos la aplicación con movimiento  -----
                timer = setTimeout(() => voltea($foto), settings.intervalo);

                const [inicioBtn, atrasBtn, playBtn, stopBtn, adelanteBtn, finBtn] = $botones;

                //  -----  Asignar eventos  -----
                $foto.on('click', () => avanza(playBtn, stopBtn, $foto));
                inicioBtn.on('click', () => inicia(playBtn, stopBtn, $foto));
                atrasBtn.on('click', () => atras(playBtn, stopBtn, $foto));
                playBtn.on('click', () => ciclo(playBtn, stopBtn, $foto));
                stopBtn.on('click', () => stop(playBtn, stopBtn));
                adelanteBtn.on('click', () => avanza(playBtn, stopBtn, $foto));
                finBtn.on('click', () => ultimo(playBtn, stopBtn, $foto));

                playBtn.hide(); // Ocultar el botón de play al inicio

            });
        };
    })();
}
