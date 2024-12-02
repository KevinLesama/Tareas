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
