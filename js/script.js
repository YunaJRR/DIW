$(document).ready(function() {
    let contador = 1; 
    let tareasPendientes = [];
    let tareasCompletadas = [];

    $("#btn-añadir-tarea").click(function() {
        añadirTarea();
    });

    function añadirTarea() {
        const inputTarea = $("#input-tarea").val();
        if (inputTarea.trim() === "") {
            return; 
        } 
        const tablaTareas = $("#tabla-tareas");
        
        const nuevaFilaTareas = $(`<tr id="${contador}">
            <td class='tarea-${contador}'>${inputTarea}</td>
            <td class='acciones'>
                <button class='btn btn-success' onclick="completarTarea(${contador})">Completar</button>
                <button class='btn btn-warning' onclick="editarTarea(${contador})">Editar</button>
                <button class='btn btn-danger' onclick="$('#${contador}').remove(); eliminarTarea(${contador})">Eliminar</button>
            </td>
        </tr>`); 
    
        tablaTareas.append(nuevaFilaTareas);
        $("#input-tarea").val("");
        tareasPendientes.push({ id: contador, texto: inputTarea });
        contador++; 
        filtrarTareas('pendientes'); 
    }

    function filtrarTareas(filtro) {
        const tablaTareas = $("#tabla-tareas");
        tablaTareas.empty(); 
        let tareasAFiltrar = [];
        
        switch (filtro) {
            // Aquí usamos el operador "Spread" [...] para añadir al array de tareasAFiltrar las nuevas tareas pendientes y completadas
            case 'todas':
                tareasAFiltrar = [...tareasPendientes, ...tareasCompletadas];
                cambiarEstiloFiltro('todas');
                break;
            case 'completadas':
                tareasAFiltrar = tareasCompletadas;
                cambiarEstiloFiltro('completadas');
                break;
            case 'pendientes':
                tareasAFiltrar = tareasPendientes;
                cambiarEstiloFiltro('pendientes');
                break;
        }
    
        if (tareasAFiltrar.length === 0) {
            mostrarMensajeTablaVacia(tablaTareas, 'No hay tareas registradas');
            return; 
        }
    
        // Ordena las tareas antes de mostrarlas
        tareasAFiltrar.sort((a, b) => a.id - b.id);
        tareasAFiltrar.forEach(tarea => {
            const nuevaFilaTareas = $(`<tr id="${tarea.id}">
                <td class='tarea-${tarea.id}' style="${tareasCompletadas.some(t => t.id === tarea.id) ? 'text-decoration: line-through; color: gray;' : ''}">${tarea.texto}</td>
                <td class='acciones'>
                    ${tareasCompletadas.some(t => t.id === tarea.id) ? 
                        `<button class='btn btn-info' onclick="descompletarTarea(${tarea.id})">Descompletar</button>` : 
                        `<button class='btn btn-success' onclick="completarTarea(${tarea.id})">Completar</button>
                        <button class='btn btn-warning' onclick="editarTarea(${tarea.id})">Editar</button>`}
                    <button class='btn btn-danger' onclick="$('#${tarea.id}').remove(); eliminarTarea(${tarea.id})">Eliminar</button>
                </td>
            </tr>`);
            tablaTareas.append(nuevaFilaTareas);
        });
    }

    function cambiarEstiloFiltro(filtroSeleccionado) {
        const filtros = ['todas', 'completadas', 'pendientes'];
        filtros.forEach(filtro => {
            const btn = $(`#btn-${filtro}`);
            if (filtro === filtroSeleccionado) {
                btn.removeClass('btn-secondary').addClass('btn-primary');
            } else {
                btn.removeClass('btn-primary').addClass('btn-secondary');
            }
        });
    }

    completarTarea = function(tareaId) {
        // Buscamos la tarea en el array de tareas pendientes y la cambiamos al de completadas
        const tareaIndex = tareasPendientes.findIndex(t => t.id === tareaId);
        if (tareaIndex !== -1) {
            const tarea = tareasPendientes.splice(tareaIndex, 1)[0];
            tareasCompletadas.push(tarea);
            
            filtrarTareas($('#btn-todas').hasClass('btn-primary') ? 'todas' : 'pendientes');
        }
    }
    
    descompletarTarea = function(tareaId) {
        // Buscamos la tarea en el array de tareas completadas y la cambiamos al de pendientes
        const tareaIndex = tareasCompletadas.findIndex(t => t.id === tareaId);
        if (tareaIndex !== -1) {
            const tarea = tareasCompletadas.splice(tareaIndex, 1)[0];
            tareasPendientes.push(tarea);
            
            filtrarTareas($('#btn-todas').hasClass('btn-primary') ? 'todas' : 'completadas'); 
        }
    }

    editarTarea = function(contador) {
        const tdTarea = $(`.tarea-${contador}`);
        const textoInicial = tdTarea.text();
        tdTarea.html(`<input type='text' class='input-edicion' value='${textoInicial}' />`);
        const accionesTd = $(`#${contador} .acciones`);
        accionesTd.html(`
            <button class='btn btn-success' onclick='confirmarEdicion(${contador})'>Confirmar</button>
            <button class='btn btn-danger' onclick='cancelarEdicion(${contador}, "${textoInicial}")'>Cancelar</button>
        `);
    }

    confirmarEdicion = function(contador) {
        const inputEdicion = $(`#${contador} .input-edicion`);
        const textoEditado = inputEdicion.val();

        if (textoEditado !== ""){
            $(`.tarea-${contador}`).text(textoEditado); 
        
            const tareaIndexPendiente = tareasPendientes.findIndex(t => t.id === contador);
            const tareaIndexCompletada = tareasCompletadas.findIndex(t => t.id === contador);
            if (tareaIndexPendiente !== -1) {
                tareasPendientes[tareaIndexPendiente].texto = textoEditado; 
            } else if (tareaIndexCompletada !== -1) {
                tareasCompletadas[tareaIndexCompletada].texto = textoEditado;
            }
            
        
            $(`#${contador} .acciones`).html(`
                <button class='btn btn-success' onclick="completarTarea(${contador})">Completar</button>
                <button class='btn btn-warning' onclick="editarTarea(${contador})">Editar</button>
                <button class='btn btn-danger' onclick="$('#${contador}').remove(); eliminarTarea(${contador})">Eliminar</button>
            `);
        }
        
    }

    cancelarEdicion = function(contador, textoPrevio) {
        $(`.tarea-${contador}`).text(textoPrevio);
        $(`#${contador} .acciones`).html(`
            <button class='btn btn-success' onclick="completarTarea(${contador})">Completar</button>
            <button class='btn btn-warning' onclick="editarTarea(${contador})">Editar</button>
            <button class='btn btn-danger' onclick="$('#${contador}').remove(); eliminarTarea(${contador})">Eliminar</button>
        `);
    }

    eliminarTarea = function(contador) {
        tareasPendientes = tareasPendientes.filter(t => t.id !== contador);
        tareasCompletadas = tareasCompletadas.filter(t => t.id !== contador);
    }

    function mostrarMensajeTablaVacia(tablaSelector, mensaje) {
        $(tablaSelector).empty();
    
        const nuevaFila = $('<tr></tr>');
        const nuevaCelda = $('<td></td>')
            .attr('colspan', $(tablaSelector).find('tr:first td').length) 
            .addClass('text-center')
            .text(mensaje);
    
        nuevaFila.append(nuevaCelda);
        $(tablaSelector).append(nuevaFila);
    }

    filtrarTareas();
    $("#btn-todas").click(() => filtrarTareas('todas'));
    $("#btn-completadas").click(() => filtrarTareas('completadas'));
    $("#btn-pendientes").click(() => filtrarTareas('pendientes'));
});