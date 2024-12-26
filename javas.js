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
   // Obtener el día actual
   const fechaActual = new Date();
   const diaSemana = fechaActual.getDay();

   // Asociar días de la semana con el atributo de la tarea
   const diasAtributos = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
   const tareasDelDia = tareas.filter(tarea => tarea[diasAtributos[diaSemana]] === "si");
  
    listaTareasDiv.innerHTML = ""; // Limpiar el contenido del div antes de renderizar
    if (tareasDelDia.length === 0) {
        listaTareasDiv.innerHTML = "<p>No hay tareas guardadas el dia </p>"+ diasAtributos[diaSemana];
        return;
    }

    tareasDelDia.forEach((tarea, index) => {
        
        // Crear un elemento para cada tarea
        var tareaDiv = document.createElement("div");
        tareaDiv.className = "tarea";
        
        // Mostrar la información de la tarea
        tareaDiv.innerHTML = `
            <p class="hoy"><strong>${tarea.nombre}</strong></p>
            <button class="btnBorrar" onclick="borrarTarea(${index})">Borrar</button>
        `;

        // Agregar un botón para marcar como hecho
        let btnHecho = document.createElement("button");
        btnHecho.classList.add("btn");
        
        btnHecho.textContent = "Hecho";
        btnHecho.addEventListener("click",function atraerForm(){
            document.getElementById("tareaHecha").style.top="0px";
        })

        document.getElementById("si").addEventListener("click", function() {
            tareasDelDia[index].hecho = "sí"; // Cambiar estado
            localStorage.setItem("tareas", JSON.stringify(tareas)); // Actualizar localStorage
            renderizarTareas(); // Volver a renderizar
            document.getElementById("tareaHecha").style.top="-500000000000px";
        });
        document.getElementById("no").addEventListener("click", function() {
            document.getElementById("tareaHecha").style.top="-500000000000px";
        });
        if (tareasDelDia.hecho === "sí") {
            tareaDiv.style.color = "green";
            
        }
        
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

document.getElementById("guardar").addEventListener("click", function traer() {
    // Obtener los valores de los campos
    let nombreid = document.getElementById("nombre").value;
    let lunes = document.getElementById("lunes");
    let martes = document.getElementById("martes");
    let miercoles = document.getElementById("miercoles");
    let jueves = document.getElementById("jueves");
    let viernes = document.getElementById("viernes");
    let sabado = document.getElementById("sabado");
    let domingo = document.getElementById("domingo");

    // Agregar la nueva tarea al array
    tareas.push({
        nombre: nombreid,
        lunes: lunes.checked ? "si" : "no",
        martes: martes.checked ? "si" : "no",
        miercoles: miercoles.checked ? "si" : "no",
        jueves: jueves.checked ? "si" : "no",
        viernes: viernes.checked ? "si" : "no",
        sabado: sabado.checked ? "si" : "no",
        domingo: domingo.checked ? "si" : "no",
        hecho: "no"
    });

    // Actualizar el localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
});

renderizarTareas();
