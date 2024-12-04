//  ---------------------------------------------------------------------
//  ----------  /astro-jquery-pruebas/  ---------------------------------
//  ----------  /src/scripts/jQueryGaleriaEfectoFlipScript.js  ----------
//  ---------------------------------------------------------------------


import $ from 'jquery';
import 'astro-jquery';
import { jQueryGaleriaEfectoFlipPlugins } from '../plugins/jquery.galeria-efecto-flip';


export const jQueryGaleriaEfectoFlipScript = () => {

    console.warn('----------  jQueryGaleriaEfectoFlipScript Cargado!!!  ----- ', 'jQuery version:', $.fn.jquery, ' ----------', '\n');

    //  -----  Llamar al Plugins jquery.galeria-efecto-flip.js para que este disponible  -----
    jQueryGaleriaEfectoFlipPlugins();

    //  widthImg:   valor mínimo 400px, valor maximo 800px
    //  heightImg:  valor mínimo 300px, valor maximo 600px

    //  -----  Llamada del Plugins jquery.galeria-efecto-flip.js -----
    $("#galeria").galeriaEfectoFlip({
        numFondos: 6,
        intervalo: 4000,
        rutaFondos: '/img/fondos/',
        rutaBotones: '/img/fondos/botones/',
        widthImg: 500,
        heightImg: 350
    });
}
