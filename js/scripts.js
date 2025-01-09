document.addEventListener("DOMContentLoaded", (event) => {
	const btnCambiaFondoSeccion1 = document.getElementById('btnCambiaFondoSeccion1');
	const btnContadorClicks  = document.getElementById('btnContadorClicks');
	const textoDinamico = document.getElementById('textoDinamico');
	let fecha = new Date();
	let hora = fecha.getHours();
	let clicks = 0;
	
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

	function cambiaFondo(selector) {
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
		let colorAleatorio = colores[Math.floor(Math.random()*colores.length)]
		const seccion = document.querySelector(selector);
		if (seccion) { 
				seccion.style.background = colorAleatorio;
				seccion.style.transition = 'all 1s';
		}
	}

	function contarClicks(){
		clicks++;
		document.getElementById('numeroClicks').innerHTML = 'Numero de clicks: ' + clicks;
	}

	

});