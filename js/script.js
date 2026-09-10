function correoValido(correo) {
    return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
}

function mostrarError(input, mensaje) {
    let error = input.parentElement.querySelector(".error-mensaje");
    if (!error) {
        error = document.createElement("div");
        error.classList.add("error-mensaje");
        input.parentElement.appendChild(error);
    }
    error.textContent = mensaje;
    error.style.display = "block";
}

function limpiarError(input) {
    const error = input.parentElement.querySelector(".error-mensaje");
    if (error) error.style.display = "none";
}

const formLogin = document.querySelector("#loginForm") || document.querySelector(".formulario-login form");
if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();
        let valido = true;
        const correo = formLogin.querySelector("#correo");
        const contrasena = formLogin.querySelector("#contrasena");

        if (!correoValido(correo.value)) {
            mostrarError(correo, "Correo inválido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com");
            valido = false;
        } else limpiarError(correo);

        if (contrasena.value.length < 4 || contrasena.value.length > 10) {
            mostrarError(contrasena, "La contraseña debe tener entre 4 y 10 caracteres");
            valido = false;
        } else limpiarError(contrasena);

        if (valido) {
            alert("Inicio de sesión exitoso (simulado)");
            formLogin.reset();
        }
    });
}


const formRegistro = document.querySelector(".formulario-registro form");
if (formRegistro) {
    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();
        let valido = true;

        const run = formRegistro.querySelector("#run");
        const nombre = formRegistro.querySelector("#nombre");
        const correo = formRegistro.querySelector("#correo");
        const contrasena = formRegistro.querySelector("#contrasena");
        const confirmar = formRegistro.querySelector("#confirmar-contrasena");

        if (!/^[0-9]{7,9}[0-9kK]$/.test(run.value)) {
            mostrarError(run, "RUN inválido (sin puntos ni guión, ej: 191110229)");
            valido = false;
        } else limpiarError(run);

        if (nombre.value.trim() === "" || nombre.value.length > 50) {
            mostrarError(nombre, "Nombre requerido (máx. 50 caracteres)");
            valido = false;
        } else limpiarError(nombre);

        if (!correoValido(correo.value)) {
            mostrarError(correo, "Correo inválido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com");
            valido = false;
        } else limpiarError(correo);

        if (contrasena.value !== confirmar.value) {
            mostrarError(confirmar, "Las contraseñas no coinciden");
            valido = false;
        } else limpiarError(confirmar);

        if (valido) {
            alert("Registro exitoso (simulado)");
            formRegistro.reset();
        }
    });
}


const formContacto = document.querySelector(".formulario-contacto form");
if (formContacto) {
    formContacto.addEventListener("submit", function (e) {
        e.preventDefault();
        let valido = true;

        const nombre = formContacto.querySelector("#nombre");
        const correo = formContacto.querySelector("#correo");
        const comentario = formContacto.querySelector("#comentario");

        if (nombre.value.trim() === "" || nombre.value.length > 100) {
            mostrarError(nombre, "Nombre requerido (máx. 100 caracteres)");
            valido = false;
        } else limpiarError(nombre);

        if (correo.value.trim() !== "" && !correoValido(correo.value)) {
            mostrarError(correo, "Correo inválido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com");
            valido = false;
        } else limpiarError(correo);

        if (comentario.value.trim() === "" || comentario.value.length > 500) {
            mostrarError(comentario, "Comentario requerido (máx. 500 caracteres)");
            valido = false;
        } else limpiarError(comentario);

        if (valido) {
            alert("Mensaje enviado (simulado)");
            formContacto.reset();
        }
    });
}


const servicios = [
    { id: 1, nombre: "Plan de pérdida de peso", precio: 25000 },
    { id: 2, nombre: "Control metabólico", precio: 30000 },
    { id: 3, nombre: "Nutrición deportiva", precio: 37000 },
    { id: 4, nombre: "Vegetariana / vegana", precio: 25000 },
    { id: 5, nombre: "Nutrición infantil", precio: 25000 },
    { id: 6, nombre: "Embarazo y lactancia", precio: 28000 }
];

const contenedorServicios = document.querySelector("#lista-servicios");
if (contenedorServicios) {
    servicios.forEach(servicio => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-4");
        col.innerHTML = `
      <div class="servicio-card">
        <h3>${servicio.nombre}</h3>
        <p>$${servicio.precio.toLocaleString("es-CL")}</p>
        <button type="button" class="btn btn-nutrivida" onclick="agregarAlCarrito(${servicio.id})">Añadir</button>
      </div>
    `;
        contenedorServicios.appendChild(col);
    });
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function agregarAlCarrito(id) {
    const servicio = servicios.find(s => s.id === id);
    const carrito = obtenerCarrito();
    carrito.push(servicio);
    guardarCarrito(carrito);
    alert(`${servicio.nombre} añadido al carrito`);
}

function actualizarContadorCarrito() {
    const contador = document.querySelector("#contador-carrito");
    if (contador) contador.textContent = obtenerCarrito().length;
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

function renderizarCarrito() {
    const contenedor = document.querySelector("#lista-carrito");
    const vacioAviso = document.querySelector("#carrito-vacio");
    if (!contenedor) return; // si no estamos en misServicios.html, no hace nada

    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        vacioAviso.style.display = "block";
    } else {
        vacioAviso.style.display = "none";
    }

    let total = 0;
    carrito.forEach((servicio, index) => {
        total += servicio.precio;
        const item = document.createElement("li");
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        item.innerHTML = `
      ${servicio.nombre} — $${servicio.precio.toLocaleString("es-CL")}
      <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
        contenedor.appendChild(item);
    });

    document.querySelector("#total-carrito").textContent = total.toLocaleString("es-CL");
}

function eliminarDelCarrito(index) {
    const carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    renderizarCarrito();
}

function vaciarCarrito() {
    guardarCarrito([]);
    renderizarCarrito();
}

function confirmarCarrito() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("Agendamiento confirmado (simulado). Nos pondremos en contacto contigo.");
    vaciarCarrito();
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);