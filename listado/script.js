document.addEventListener("DOMContentLoaded", (event) =>{ 

    let rowNumber = 0;
    const selRows = document.getElementById("sel-rows")
    const displayTable = document.getElementById("table");
    displayTable.style.display = "none";

    
    selRows.addEventListener("change", (event) => {
        if (isNaN(event.target.value)){
            displayTable.style.display = "none"; 
        }else{
            // Según el número de filas que elija el usuario se llama a la función de creación de filas con ese mismo número
            displayTable.style.display = "";
            rowNumber=event.target.value;
            randomImg(rowNumber);
            resetRows();
            limitRows(rowNumber);
        }

    });

    function limitRows(rowNumber){
        // Limitación de filas según el número introducido
        for (let i = 1; i <= 20; i++) {
            if (i>rowNumber){
                let row = document.getElementById(i);
                row.style.display = 'none';
            }
            
        }
        
    }
    function resetRows(){
        // Eliminar filas
        for (let i = 1; i <= 20; i++) {
            let row = document.getElementById(i);
            row.style.display = '';
        }
    }

    function randomImg(rowNumber){
        // Generar imágenes aleatorias para el listado cada vez que se elige un número de filas
        for (let i = 1; i <= rowNumber; i++){
            let randomId = Math.floor(Math.random() * 1084);
            let image = document.getElementById("img-".concat(i));
            image.src = "https://picsum.photos/id/".concat(randomId).concat("/30?v1.0.1");
            
            image.onerror = function() {
                image.src = "default.jpg"; 
            };
        }

    }
    
});