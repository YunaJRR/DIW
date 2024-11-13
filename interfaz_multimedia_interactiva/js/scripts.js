document.addEventListener("DOMContentLoaded", (ev) => {
    // Variables para controlar el estado de reproducción y si la página ha comenzado
    let currentlyPlaying = true; 


    // Crea un elemento source para el video
    let source = document.createElement('source');
    source.src = ''; 
    let song = Math.floor(Math.random() * 3); // Selecciona aleatoriamente una canción
    let video = document.getElementById('video'); 
    video.appendChild(source); 
    source.setAttribute('src', ''); 
    source.setAttribute('type', 'video/mp4');

    // Obtiene elementos del DOM
    const displayKeys = document.getElementById('controles');
    const textMute = document.getElementById('text-mute');
    const displaySocials = document.getElementById('sociales'); 
    const displayLogo = document.getElementById('bmth-logo');

    // Oculta los elementos de la página inicialmente
    displayKeys.style.display = "none";
    displaySocials.style.display = "none";

    // Inicializa los objetos de audio
    const darksideAudio = new Audio('darkside.mp3');
    const koolAudio = new Audio('kool.mp3');
    const x1Audio = new Audio('1x1.mp3');
    const songs = ['darkside', 'kool', '1x1'];

    // Al clicar en el logo inicar la página

    displayLogo.onclick = startPage;
    document.getElementById('Space').onclick = function() {audioMute(song, source, currentlyPlaying)};
    document.getElementById('ArrowUp').onclick = function(){changeVolume(song, true)};
    document.getElementById('ArrowDown').onclick = function(){changeVolume(song, false)};
    document.getElementById('ArrowRight').onclick = function(){song = changeSong(song, source, 'right')};
    document.getElementById('ArrowLeft').onclick = function(){song = changeSong(song, source, 'left')};
    

    // Evento al presionar teclas
    document.body.addEventListener("keydown", (ev) => {
        transformImg(ev.code, false); 
        // Manejo de la tecla de espacio para mutear/desmutear
        if (ev.code === "Space") {
            audioMute(song, source, currentlyPlaying);
        }
        // Control de volumen con flechas arriba y abajo
        else if (ev.code === 'ArrowUp') {
            changeVolume(song, true);
        } else if (ev.code === 'ArrowDown') {
            changeVolume(song, false);
        } 
        // Cambia de canción con flechas derecha e izquierda
        else if (ev.code === 'ArrowRight') {
            song = changeSong(song, source, 'right'); 
        } else if (ev.code === 'ArrowLeft') {
            song = changeSong(song, source, 'left'); 
        } 
    });

    // Efecto al soltar la tecla
    document.body.addEventListener("keyup", (ev) => {
        transformImg(ev.code, true); 
    });

    // Función para reproducir la canción actual
    function audioPlay(currentSong, source) {
        let songName = songs[currentSong]; 
        source.src = songName.concat('.mp4'); 
        video.load(); 
        video.play(); 
        // Reproduce el audio correspondiente
        switch (currentSong) {
            case 0:
                darksideAudio.play();
                break;
            case 1:
                koolAudio.play();
                break;
            case 2:
                x1Audio.play();
                break;
            default:
                break;
        }
    }
    // Función para cambiar el volumen
    function changeVolume(currentSong, plus) {
        switch (currentSong) {
            case 0:
                if (darksideAudio.volume >= 0 && darksideAudio.volume <= 1) {
                    if (plus) {
                        darksideAudio.volume = Math.min(darksideAudio.volume + 0.2, 1); // Ensure volume does not exceed 1
                    } else {
                        darksideAudio.volume = Math.max(darksideAudio.volume - 0.2, 0); // Ensure volume does not fall below 0
                    }
                }
                break;
            case 1:
                if (koolAudio.volume >= 0 && koolAudio.volume <= 1) {
                    if (plus) {
                        koolAudio.volume = Math.min(koolAudio.volume + 0.2, 1);
                    } else {
                        koolAudio.volume = Math.max(koolAudio.volume - 0.2, 0);
                    }
                }
                break;
            case 2:
                if (x1Audio.volume >= 0 && x1Audio.volume <= 1) {
                    if (plus) {
                        x1Audio.volume = Math.min(x1Audio.volume + 0.2, 1);
                    } else {
                        x1Audio.volume = Math.max(x1Audio.volume - 0.2, 0);
                    }
                }
                break;
            default:
                break;
        }
    }

    // Función para mutear o desmutear la canción actual
    function audioMute(currentSong, source, muted) {
        let songName = songs[currentSong]; 
        source.src = songName.concat('.mp4'); 
        if (muted){
            textMute.textContent = " UNMUTE";
            currentlyPlaying = false;
        }else{
            textMute.textContent = " MUTE";
            currentlyPlaying = true;
        }
        // Establece el estado de muteo para el audio correspondiente
        switch (currentSong) {
            case 0:
                darksideAudio.muted = muted;
                break;
            case 1:
                koolAudio.muted = muted;
                break;
            case 2:
                x1Audio.muted = muted;
                break;
            default:
                break;
        }
    }

    // Función para cambiar de canción
    function changeSong(currentSong, source, direction) {
        switch (currentSong) {
            case 0:
                darksideAudio.pause(); 
                darksideAudio.currentTime = 0; 
                // Reproducir la siguiente o última canción dependiendo de la tecla presionada
                audioPlay(direction === 'right' ? currentSong + 1 : 2, source, true);
                return direction === 'right' ? currentSong + 1 : 2;
            case 1:
                koolAudio.pause(); 
                koolAudio.currentTime = 0; 
                // Reproducir la siguiente o última canción dependiendo de la tecla presionada
                audioPlay(direction === 'right' ? currentSong + 1 : currentSong - 1, source, true);
                return direction === 'right' ? currentSong + 1 : currentSong - 1; 
            case 2:
                x1Audio.pause(); 
                x1Audio.currentTime = 0;
                // Reproducir la siguiente o última canción dependiendo de la tecla presionada
                audioPlay(direction === 'right' ? 0 : currentSong - 1, source, true); 
                return direction === 'right' ? 0 : currentSong - 1; 
        }
    }

    // Función para aplicar efecto de transformación a las imágenes
    function transformImg(imgId, keyUp) {
        let image = document.getElementById(imgId); 
        if (!image) {
            return; 
        }
        // Aplica la transformación correspondiente
        image.style.transform = keyUp ? 'scale(1)' : 'scale(1.1)';
        image.style.transition = 'transform 0.3s ease'; // Transición suave
    }

    // Función que se ejecuta al iniciar la página
    function startPage() {
        video.style.width = '100vw';
        video.style.height = '100vh';
        displayKeys.style.display = "block"; 
        displaySocials.style.display = "block"; 
        displayLogo.style.display = "none"; 
       
        document.getElementById('text-container').style.display = "block";
        document.getElementById('changing-text').style.display = "flex";
        audioPlay(song, source); 
    }

    // Configuración de la animación
    let ml4 = {};
    ml4.opacityIn = [0, 1];
    ml4.scaleIn = [0.2, 1]; 
    ml4.scaleOut = 3; 
    ml4.durationIn = 800; 
    ml4.durationOut = 600;
    ml4.delay = 500; 

    // Configura la animación usando Anime.js
    anime.timeline({ loop: true })
        .add({
            targets: '.ml4 .letters-1',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
        }).add({
            targets: '.ml4 .letters-1',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: "easeInExpo",
            delay: ml4.delay
        }).add({
            targets: '.ml4 .letters-2',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
        }).add({
            targets: '.ml4 .letters-2',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: "easeInExpo",
            delay: ml4.delay
        }).add({
            targets: '.ml4 .letters-3',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
        }).add({
            targets: '.ml4 .letters-3',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: "easeInExpo",
            delay: ml4.delay
        }).add({
            targets: '.ml4',
            opacity: 0,
            duration: 500,
            delay: 500
        });
});