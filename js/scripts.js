document.addEventListener("DOMContentLoaded", (event) => {
	const btnCambiaFondoSeccion1 = document.getElementById('btnCambiaFondoSeccion1');
	const btnContadorClicks  = document.getElementById('btnContadorClicks');
	const textoDinamico = document.getElementById('textoDinamico');
	const btnTamañoTexto = document.getElementById('btnTamañoTexto');
	const btnCambiarTema = document.getElementById('btnCambiarTema');
	const progresoScroll = document.getElementById("progresoScroll");
	const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let fecha = new Date();
	let hora = fecha.getHours();
	let clicks = 0;
	let textoTamañoDefault = true;
	
	if(hora>6 && hora<12){
		textoDinamico.innerHTML = 'Buenos días';
	}else if (hora>12 && hora<21){
		textoDinamico.innerHTML = 'Buenas tardes'
	}else{
		textoDinamico.innerHTML = 'Buenas noches'
	}

	btnCambiaFondoSeccion1.onclick = function() {
		cambiaFondo('.seccion1'); 
	};
	btnContadorClicks.onclick = function() {
		contarClicks();
	}
	btnTamañoTexto.onclick = function(){
		cambiarTamañoTexto(textoTamañoDefault);
		if (textoTamañoDefault){
			textoTamañoDefault = false;
		}else{
			textoTamañoDefault = true;
		}
	}
	btnCambiarTema.onclick = function(){
		cambiarTema();
	}
	window.addEventListener("scroll", () => {
		const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		progresoScroll.style.width = `${(scrollTop / altura) * 100}%`;
	});

	function cambiaFondo(selector) {
		let colorActual;
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
		
		while (colorActual === colorAleatorio){
			colorAleatorio = colores[Math.floor(Math.random()*colores.length)];
		}
		colorActual = colorAleatorio;
		const seccion = document.querySelector(selector);
		if (seccion) { 
				seccion.style.background = colorAleatorio;
				seccion.style.transition = 'background .3s';
		}
	}

	function contarClicks(){
		clicks++;
		document.getElementById('numeroClicks').innerHTML = 'Numero de clicks: ' + clicks;
	}

	function cambiarTamañoTexto(tamañoDefault) {
		const body = document.body;
		const currentFontSize = window.getComputedStyle(body).fontSize;
		const currentSize = parseFloat(currentFontSize);
		if (tamañoDefault){
			body.style.fontSize = (currentSize * 1.2) + 'px'; 
		}else{
			body.style.fontSize = (currentSize / 1.2) + 'px'; 
		}
		
	}
	function cambiarTema (){
		const body = document.body;
		body.classList.toggle("modo-oscuro");
		body.style.transition = 'all .3s'
		console.log("hey");
		
	}

});