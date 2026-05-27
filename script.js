// variables del registro (formulario)
const formulario = document.getElementById("formulario");
const nombre_input = document.getElementById("nombre");
const apellido_input = document.getElementById("apellido");
const cargo_input = document.getElementById("cargo");
const correo_input = document.getElementById("correo");

// variables para los mensajes de error
const error_nombre = document.getElementById("error-nombre");
const error_apellido = document.getElementById("error-apellido");
const error_cargo = document.getElementById("error-cargo");
const error_correo = document.getElementById("error-correo");
const mensaje = document.getElementById("mensaje");

// variables de la tabla y buscador
const tabla = document.getElementById("tabla-colab");
const buscador = document.getElementById("busqueda");
const btn = document.getElementById("registrar-btn");

// areglo de colaboradores
let colaboradores = [];

// funcion reutilizable para renderizar tabla
function renderizarTabla(lista) {
  tabla.innerHTML = ""; // limpia la tabla antes de dibujarla 

  lista.forEach(function(colaborador, index){
    tabla.innerHTML += `
      <tr>
        <td>${colaborador.nombre}</td>
        <td>${colaborador.apellido}</td>
        <td>${colaborador.cargo}</td>
        <td>${colaborador.correo}</td>
        <td>
          <button onclick="eliminarColaborador(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// funcion reutilizable para eliminar 
function eliminarColaborador(index) {
  colaboradores.splice(index, 1);//elimina elementos del arreglo
  renderizarTabla(colaboradores);
}

//  funcion reutilizable para validacion de datos
function validarDatos(nombre, apellido, cargo, correo){
  let esValido = true;

  // limpiar mensajes previos
  error_nombre.textContent = "";
  error_apellido.textContent = "";
  error_cargo.textContent = "";
  error_correo.textContent = "";
  mensaje.textContent = "";

  // validaciones individuales
  if (nombre === ""){
    error_nombre.textContent = "El nombre es obligatorio.";
    esValido = false;
  }
    if (apellido === ""){
    error_apellido.textContent = "El apellido es obligatorio.";
    esValido = false;
  }
    if (cargo === ""){
    error_cargo.textContent = "El cargo es obligatorio.";
    esValido = false;
  }
    if (correo === ""){
    error_correo.textContent = "El correo es obligatorio.";
    esValido = false;

  } else if (!correo.endsWith("@empresa.cl")) {
    error_correo.textContent = "El correo debe terminar en @empresa.cl.";
    esValido = false;
  }

  return esValido;
}
// funcion para filtrar reutilizable 
function filtrarTabla(texto) {
  const filtrados = colaboradores.filter(function(colaborador){
    return(
      colaborador.nombre.toLowerCase().includes(texto)||
      colaborador.cargo.toLowerCase().includes(texto)
    );
  });
  renderizarTabla(filtrados);
}
//evento submit del formulario 
formulario.addEventListener("submit", function (event){
  event.preventDefault();

  const nombre = nombre_input.value.trim();
  const apellido = apellido_input.value.trim();
  const cargo = cargo_input.value.trim();
  const correo = correo_input.value.trim();

  // se llama la funcion reutilizable de validacion
  if (validarDatos(nombre, apellido, cargo, correo)) {
    //crear objeto
    const colaborador = {nombre, apellido, cargo, correo};

    //Agregar al arreglo
    colaboradores.push(colaborador);

    //renderizar tabla
    renderizarTabla(colaboradores);

    //mensaje de exito
    mensaje.textContent = "Colaborador registrado correctamente."
    mensaje.style.color = "green";

    // se limpia el formulario
    formulario.reset();
  }
});

// evento keyuyp del buscador
buscador.addEventListener("keyup", function(){
  const texto = buscador.value.toLowerCase();

  //se llama a la funcion de filtrado
  filtrarTabla(texto);
})