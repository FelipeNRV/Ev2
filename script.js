// variables del registro y formulario
const formulario = document.getElementById("formulario");
const nombre_input = document.getElementById("nombre");
const apellido_input = document.getElementById("apellido");
const cargo_input = document.getElementById("cargo");
const correo_input = document.getElementById("correo");

// variables para los mensajes de error individuales 
const error_nombre = document.getElementById("error-nombre");
const error_apellido = document.getElementById("error-apellido");
const error_cargo = document.getElementById("error-cargo");
const error_correo = document.getElementById("error-correo");
const mensaje = document.getElementById("mensaje");

// variables de la tabla y buscador

// cuerpo de la tabla y donde los colaboradores seran agregados
const tabla = document.getElementById("tabla-colab");
//input buscador
const buscador = document.getElementById("busqueda");
//boton de registro
const btn = document.getElementById("registrar-btn");

// arreglo donde se almacenaran los colaboradores
let colaboradores = [];

// funcion reutilizable para mostrar los colaboradores en la tabla
function renderizarTabla(lista) {
// limpia la tabla antes de volver a dibujarla 
  tabla.innerHTML = ""; 
// recorre cada colaborador del arreglo 
  lista.forEach(function(colaborador, index){
// agrega filas dinamicamente a la tabla
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

// funcion que elimina colaboradores del arreglo usando su posicion  
function eliminarColaborador(index) {
  //splice elimina elementos del arreglo
  colaboradores.splice(index, 1);
  //actualiza la tabla despues de eliminar
  renderizarTabla(colaboradores); 
}

// validaciones individuales de campos vacios y formato del correo
function validarDatos(nombre, apellido, cargo, correo){
  let esValido = true;

  // limpiar mensajes previos
  error_nombre.textContent = "";
  error_apellido.textContent = "";
  error_cargo.textContent = "";
  error_correo.textContent = "";
  mensaje.textContent = "";

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

// funcion para filtrar reutilizable por nombre o cargo del colaborador
function filtrarTabla(texto) {
  const filtrados = colaboradores.filter(function(colaborador){
    return(
      colaborador.nombre.toLowerCase().includes(texto)||
      colaborador.cargo.toLowerCase().includes(texto)
    );
  });
  renderizarTabla(filtrados);
}
//evento que se ejecuta al registrar un colaborador 
formulario.addEventListener("submit", function (event){
  // evita recargar la pagina
  event.preventDefault();
  // obtiene valores ingresados por el usuario 
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