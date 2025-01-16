document.addEventListener("DOMContentLoaded", (event) => {
    const btnCambiaFondoSeccion1 = document.getElementById('btnCambiaFondoSeccion1');
    const btnContadorClicks = document.getElementById('btnContadorClicks');
    const btnTamañoTexto = document.getElementById('btnTamañoTexto');
    const btnCambiarTema = document.getElementById('btnCambiarTema');
    const btnIrArriba = document.getElementById("btnIrArriba");
    const btnLeerPagina = document.getElementById("btnLeerPagina");

    const textoDinamico = document.getElementById('textoDinamico');
    const progresoScroll = document.getElementById("progresoScroll");
    const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let fecha = new Date();
    let hora = fecha.getHours();
    let clicks = 0;
    let textoTamañoDefault = true;

    if (hora > 6 && hora < 12) {
        textoDinamico.innerHTML = 'Buenos días';
    } else if (hora >= 12 && hora < 21) {
        textoDinamico.innerHTML = 'Buenas tardes';
    } else {
        textoDinamico.innerHTML = 'Buenas noches';
    }

    btnCambiaFondoSeccion1.onclick = function () {
        cambiaFondo('.seccion1');
    };
    btnContadorClicks.onclick = function () {
        contarClicks();
    };
    btnTamañoTexto.onclick = function () {
        cambiarTamañoTexto(textoTamañoDefault);
        textoTamañoDefault = !textoTamañoDefault;
    };
    btnCambiarTema.onclick = function () {
        cambiarTema();
    };
    btnLeerPagina.onclick = function() {
        leerPagina();
    }

    window.addEventListener("scroll", () => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        progresoScroll.style.width = `${(scrollTop / altura) * 100}%`;
    });

    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnIrArriba.style.display = "block";
        } else {
            btnIrArriba.style.display = "none";
        }
    };

    btnIrArriba.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    function cambiaFondo(selector) {
        let colorActual = ''; 
        let colorAleatorio;
        const colores = [
            'lightblue',
            'lightcoral',
            'lightcyan',
            'lightgoldenrodyellow',
            'lightgray',
            'lightgreen',
            'lightpink',
            'lightsalmon',
            'lightseagreen',
            'lightskyblue',
            'lightslategray',
            'lightsteelblue',
            'lightyellow'
        ];
        do {
            colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        } while (colorActual === colorAleatorio);
        colorActual = colorAleatorio;

        const seccion = document.querySelector(selector);
        if (seccion) {
            seccion.style.background = colorAleatorio;
            seccion.style.transition = 'background .3s';
        }
    }

    function contarClicks() {
        clicks++;
        document.getElementById('numeroClicks').innerHTML = 'Numero de clicks: ' + clicks;
    }

    function cambiarTamañoTexto(tamañoDefault) {
        const body = document.body;
        body.style.transition = 'none';

        const elementosTexto = document.querySelectorAll('h1, p, button, a, div');

        elementosTexto.forEach(elemento => {
            const tamañoActual = parseFloat(window.getComputedStyle(elemento, null).getPropertyValue('font-size'));
            const nuevoTamaño = tamañoDefault ? (tamañoActual * 1.2): (tamañoActual / 1.2);
            elemento.style.fontSize = nuevoTamaño + 'px'; 
        });

        setTimeout(() => {
            body.style.transition = 'all .3s';
        }, 10);
    }

    function cambiarTema() {
		const body = document.body;
		body.classList.toggle("modo-oscuro");
	
		if (body.classList.contains("modo-oscuro")) {
			localStorage.setItem("modo", "oscuro");
		} else {
			localStorage.setItem("modo", "claro");
		}
	}

    const modoFavorito = localStorage.getItem("modo");
	if (modoFavorito === "oscuro") {
		document.body.classList.add("modo-oscuro");
	}

    const leerPagina = () => {
        const textoPagina = new SpeechSynthesisUtterance(textoDinamico.innerHTML + ", Cambiar tema, Tamaño texto, Leer página. Seccion 1. Seccion 2. Con este botón podrás cambiar el color de fondo de esta sección, Nuevo Fondo, Contador de clicks, Click, Numero de clicks: " + clicks +' ...Contactanos. Email: jaimerocharodriguez04@gmail.com . Teléfono: +34 622188432. Dirección: Av. Reina Sofía 6. © 2025 Jaime Rocha Rodríguez. All rights reserved.');
        speechSynthesis.speak(textoPagina);
    };
	
});