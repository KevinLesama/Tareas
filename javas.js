// Obtener los botones
var btnAgregar = document.getElementById("agregar");
var btnCerrar = document.getElementById("cerrara");

// Evento para mostrar el formulario
btnAgregar.addEventListener("click", function() {
    var form = document.querySelector(".hoy.form");
    form.style.top = "50px"; // Cambia a la posición visible
});

// Evento para ocultar el formulario
btnCerrar.addEventListener("click", function() {
    var form = document.querySelector(".hoy.form");
    form.style.top = "-5000000px"; // Mueve el formulario fuera de la vista
});

// Verificar o inicializar el localStorage
if (!localStorage.getItem("tareas")) {
    localStorage.setItem("tareas", JSON.stringify([]));
}

// Recuperar las tareas
var tareas = JSON.parse(localStorage.getItem("tareas"));

// Referencia al div donde se mostrarán las tareas
var listaTareasDiv = document.getElementById("tareasHoy");

// Función para renderizar las tareas en el div
function renderizarTareas() {
    listaTareasDiv.innerHTML = ""; // Limpiar el contenido del div antes de renderizar
    if (tareas.length === 0) {
        listaTareasDiv.innerHTML = "<p>No hay tareas guardadas</p>";
        return;
    }

    tareas.forEach((tarea, index) => {
        // Crear un elemento para cada tarea
        let tareaDiv = document.createElement("div");
        tareaDiv.className = "tarea";

        // Mostrar la información de la tarea
        tareaDiv.innerHTML = `
            <p class="hoy"><strong>${tarea.nombre}</strong></p>
            <button class="options-btn" onclick="borrarTarea(${index})">Borrar</button>
        `;

        // Agregar un botón para marcar como hecho
        let btnHecho = document.createElement("button");
        btnHecho.classList.add("btnright");
        btnHecho.textContent = "Hecho";
        btnHecho.addEventListener("click", function() {
            tareas[index].hecho = "sí"; // Cambiar estado
            
            localStorage.setItem("tareas", JSON.stringify(tareas)); // Actualizar localStorage
            renderizarTareas(); // Volver a renderizar
        });

        tareaDiv.appendChild(btnHecho);
        listaTareasDiv.appendChild(tareaDiv);
    });
}

// Función para borrar una tarea
function borrarTarea(index) {
    tareas.splice(index, 1); // Eliminar la tarea
    localStorage.setItem("tareas", JSON.stringify(tareas)); // Actualizar localStorage
    renderizarTareas(); // Volver a renderizar
}
tareas.push({
    nombre:"hola",dia:"Lunes",hecho:"no"
})
// Llamar a la función para mostrar las tareas al cargar la página
renderizarTareas();
