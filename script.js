// variables del registro (formulario)
const formulario = document.getElementById("formulario");
const nombre_input = document.getElementById("nombre");
const apellido_input = document.getElementById("apellido");
const cargo_input = document.getElementById("cargo");
const correo_input = document.getElementById("correo");

// variable tabla   
const tabla = document.getElementById("tabla-colab");
const buscador = document.getElementById("busqueda");

const btn = document.getElementById("registrar-btn");

// areglo de colaboradores

let colaboradores = [];
//mensaje
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = nombre_input.value.trim();
  const apellido = apellido_input.value.trim();
  const cargo = cargo_input.value.trim();
  const correo = correo_input.value.trim();
//validar campos vacios
  if (
    nombre === "" ||
    apellido === ""||
    cargo === ""||
    correo === ""

) {
    mensaje.textContent = "Todos los campos son obligatorios";
    mensaje.style.color = "red";

    return;
}
// validar correo
if (!correo.endsWith("@empresa.cl")) {

    mensaje.textContent = "El correo debe terminar en @empresa.cl";
    mensaje.style.color = "red";

    return;
}
// crear objeto
const colaborador = {
  nombre,
  apellido,
  cargo,
  correo
};

//agregar al arreglo
colaboradores.push(colaborador);

//mostrar mensaje de exito
mensaje.textContent = "Colaborador registrado correctamente";
mensaje.style.color = "green";

// se limpia el formulario
formulario.reset();


});
