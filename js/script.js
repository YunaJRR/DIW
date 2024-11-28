$(document).ready(function() {
    $("#btn-añadir-tarea").click(function() {
        añadirTarea();
    });

    function añadirTarea() {
        let contador = 1;
        const inputTarea = $("#input-tarea").val();
        if (inputTarea.trim() === "") return; 

        const tablaTareas = $("#tabla-tareas");
        const nuevaFilaTareas = document.createElement("tr");
        $(nuevaFilaTareas).attr("id", `${contador}`);
        nuevaFilaTareas.innerHTML = `
            <td class='tarea-${contador}'>${inputTarea}</td>
            <td class='acciones'>
                <button class='btn btn-success' onclick="completarTarea(${contador})">Completar</button>
                <button class='btn btn-warning' onclick="editarTarea(${contador})">Editar</button>
                <button class='btn btn-danger' onclick="$('#${contador}').remove()">Eliminar</button>
            </td>`;
        tablaTareas.append(nuevaFilaTareas);

        $("#input-tarea").val("");
    }

    completarTarea = function(tarea){
        console.log(tarea);        
        $(".tarea-1").css({
            "text-decoration": "line-through"
        });
    }

    editarTarea = function(contador){
        const tdTarea = $(`.tarea-${contador}`);
        const currentText = tdTarea.text();
        tdTarea.html(`<input type='text' class='edit-input' value='${currentText}' />`);
        
        const tareaEditada = $(this).val();
        $(`.tarea-${contador}`).html(tareaEditada); 
    }

    eliminarTarea = function(tarea){
        
    }
});