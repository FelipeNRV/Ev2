// variables del registro (formulario)
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre").value.trim();
const apellido = document.getElementById("apellido").value.trim();
const corgo = document.getElementById("cargo").value.trim();
const correo = document.getElementById("correo").value.trim();

// variable tabla
const tabla = document.getElementById("tabla-colab");
const buscador = document.getElementById("busqueda");

const btn = document.getElementById("registrar-btn");

// areglo de colaboradores

let colaboradores = [];
