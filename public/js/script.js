const divLoggin = document.getElementById("div-loggin");
const formloggin = document.getElementById("form-loggin");
const btnIniciarSesion = document.getElementById("btn-iniciar-sesion");
const msjErrorLoggin = document.getElementById("msjErrorLoggin");
const msjErrorContraseña = document.getElementById("msjErrorContraseña");

const btnIrAlInicio = document.querySelectorAll(".btnIrAInicio");
const emailIniciarSesion = document.getElementById("email");
const passwordIniciarSesion = document.getElementById("password");
const btnRegistrarse = document.getElementById("btn-registrarse");
const divRegistrarse = document.getElementById("div-registrarse");
const formRegistrarse = document.getElementById("form-registrarse");
const nombreRegistro = document.getElementById("nombreRegistro");
const msjErrorNombreRegistro = document.getElementById("msjErrorNombreRegistro");
const emailRegistro = document.getElementById("emailRegistro");
const msjErrorEmailRegistro = document.getElementById("msjErrorEmailRegistro");
const telefonoRegistro = document.getElementById("telefonoRegistro");
const msjErrorTel = document.getElementById("msjErrorTel");
const claveRegistro = document.getElementById("claveRegistro");
const msjErrorClaveRegistro = document.getElementById("msjErrorClaveRegistro")
const btnRegistro = document.getElementById("btn-registro");

const consultarTurnos = document.getElementById("consultar-turnos");
const form = document.getElementById("form");
const especialidad = document.getElementById("especialidad");
const msjErrorEspecialidad = document.getElementById("msjErrorEspecialidad");
const btnConsultar = document.getElementById("btn-consultar");

const turnosDisponibles = document.getElementById("turnos-disponibles");
const turnosSeleccionados = document.getElementById("turnos-seleccionados");
const span = document.getElementById("span");
const table = document.getElementById("table");
const tBody = document.createElement("tbody");
const msjTurnos = document.getElementById("msj-turnos");
const h2MsjTurnos = document.getElementById("title-msj-turnos");

const footer = document.getElementById("footer");

const limpiarAdvertencias = () => {
    const msjList = [
        msjErrorContraseña,
        msjErrorNombreRegistro,
        msjErrorEspecialidad,
        msjErrorEmailRegistro,
        msjErrorTel,
        msjErrorClaveRegistro
    ];
    msjList.forEach(msj => {
        msj.innerText = "";
        msj.classList.remove("msjError");
    });
}

let nombreReserva = null;
let emailReserva = null;
btnIniciarSesion.addEventListener("click", async (event) => {
    event.preventDefault();
    limpiarAdvertencias();

    const formData = new FormData(formloggin);
    const datos = Object.fromEntries(formData.entries());

    if (datos.email.trim() === "") {
        msjErrorLoggin.innerHTML = "<p>Complete con un email. Por ej: facundo@gmail.com</p>";
        msjErrorLoggin.classList.add("msjError");
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(datos.email.trim())) {
        msjErrorLoggin.innerHTML = "<p>Formato de email inválido. Por ej: facundo@gmail.com</p>";
        msjErrorLoggin.classList.add("msjError");
        return;
    }

    if (datos.password.trim() === "") {
        msjErrorContraseña.innerHTML = "<p>La constraseña no puede estar vacia</p>";
        msjErrorContraseña.classList.add("msjError");
        return;
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(datos.password)) {
        msjErrorContraseña.innerHTML = "<p>La constraseña debe contener al menos una letra y un número</p>";
        msjErrorContraseña.classList.add("msjError");
        return;
    } else if (datos.password.length < 8) {
        msjErrorContraseña.innerHTML = "<p>La contraseña debe tener al menos 8 caracteres</p>";
        msjErrorContraseña.classList.add("msjError");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: datos.email,
                password: datos.password
            })
        })

        const respuesta = await res.json();
        if (respuesta.ok) {
            Swal.fire({
                title: `Bienvenido, ${respuesta.usuario.nombre}`,
                text: "Gestione sus turnos de manera online",
                icon: "success",
                showConfirmButton: false,
                timer: 3000
            })
                .then(() => {
                    divLoggin.classList.add("disable");
                    consultarTurnos.classList.remove("disable");
                });
        } else {
            Swal.fire({
                title: "Error",
                text: respuesta.mensaje || "Email y/o contraseña incorrecta",
                icon: "warning"
            });
            return;
        }

        nombreReserva = respuesta.usuario.nombre;
        emailReserva = respuesta.usuario.email;

    } catch (error) {
        console.error("Error en login:", error);
        Swal.fire({
            title: "Error",
            text: "No se pudo conectar con el servidor",
            icon: "error"
        });
    }
});

btnRegistrarse.addEventListener("click", (event) => {
    event.preventDefault();
    divLoggin.classList.add("disable");
    divRegistrarse.classList.remove("disable");
    divRegistrarse.classList.add("loggin");
    footer.classList.remove("fixed");
    footer.classList.add("static");
});

btnIrAlInicio.forEach(btn => {
    btn.addEventListener("click", () => {
        divRegistrarse.classList.remove("loggin");
        divRegistrarse.classList.add("disable");
        divLoggin.classList.remove("disable");
        consultarTurnos.classList.add("disable");
        emailIniciarSesion.value = "";
        passwordIniciarSesion.value = "";
        especialidad.value = "";
        turnosDisponibles.classList.add("disable");
        footer.classList.remove("static");
        footer.classList.add("fixed");
        msjTurnos.classList.remove("active");
        msjTurnos.classList.add("disable");
    })
});

btnRegistro.addEventListener("click", async (event) => {
    event.preventDefault();
    limpiarAdvertencias();

    if (nombreRegistro.value.trim() === "") {
        msjErrorNombreRegistro.innerHTML = "<p>Complete con su nombre completo. Por ej: Facundo D'addese</p>";
        msjErrorNombreRegistro.classList.add("msjError");
        return;
    }

    if (emailRegistro.value.trim() === "") {
        msjErrorEmailRegistro.innerHTML = "<p>Complete con un email. Por ej: facundo@gmail.com</p>";
        msjErrorEmailRegistro.classList.add("msjError");
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(emailRegistro.value.trim())) {
        msjErrorEmailRegistro.innerHTML = "<p>Formato de email inválido. Por ej: facundo@gmail.com</p>";
        msjErrorEmailRegistro.classList.add("msjError");
        return;
    }

    if (telefonoRegistro.value.trim() === "") {
        msjErrorTel.innerHTML = "<p>Por favor, ingrese un número de teléfono.</p>";
        msjErrorTel.classList.add("msjError");
        return;
    } else if (!/^\d{8,15}$/.test(telefonoRegistro.value.trim())) {
        msjErrorTel.innerHTML = "<p>Ingrese un teléfono válido (solo números, mínimo 8 dígitos).</p>";
        msjErrorTel.classList.add("msjError");
        return;
    }

    if (claveRegistro.value.trim() === "") {
        msjErrorClaveRegistro.innerHTML = "<p>La constraseña no puede estar vacia</p>";
        msjErrorClaveRegistro.classList.add("msjError");
        return;
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(claveRegistro.value)) {
        msjErrorClaveRegistro.innerHTML = "<p>La constraseña debe contener al menos una letra y un número</p>";
        msjErrorClaveRegistro.classList.add("msjError");
        return;
    } else if (claveRegistro.value.length < 8) {
        msjErrorClaveRegistro.innerHTML = "<p>La contraseña debe tener al menos 8 caracteres</p>";
        msjErrorClaveRegistro.classList.add("msjError");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/usuarios/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombreRegistro: nombreRegistro.value,
                emailRegistro: emailRegistro.value,
                telefonoRegistro: telefonoRegistro.value,
                claveRegistro: claveRegistro.value
            })
        });

        const respuesta = await res.json();
        if (respuesta.ok) {
            Swal.fire({
                icon: "success",
                title: respuesta.mensaje,
                confirmButtonText: "Iniciar sesion"
            }).then(() => {
                divLoggin.classList.remove("disable");
                divRegistrarse.classList.add("disable");
                nombreRegistro.value = "";
                emailRegistro.value = "";
                telefonoRegistro.value = "";
                claveRegistro.value = "";
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: respuesta.mensaje || "Ocurrió un error inesperado",
                confirmButtonText: "Aceptar"
            });
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo conectar con el servidor",
            confirmButtonText: "Aceptar"
        });
    }
});

btnConsultar.addEventListener("click", async (event) => {
    event.preventDefault();
    limpiarAdvertencias();

    if (hayTurnos) {
        footer.classList.remove("fixed");
        footer.classList.add("static");
    }

    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    if (!datos.especialidad || datos.especialidad.trim() === "") {
        msjErrorEspecialidad.innerHTML = "<p>Complete con una especialidad. Por ej: Kinesiología</p>";
        msjErrorEspecialidad.classList.add("msjError");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/reservas");
        const reservas = await res.json();

        const reservasFiltradas = reservas.filter(r =>
            r.especialidad.toLowerCase() === datos.especialidad.toLowerCase()
        );

        if (reservasFiltradas.length > 0) {
            tablaTurnos(reservasFiltradas);
        } else {
            Swal.fire({
                icon: "info",
                title: "Sin resultados",
                text: "No hay reservas para esa especialidad."
            });
        }

    } catch (error) {
        console.error("Error al consultar reservas:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo conectar con el servidor"
        });
    }
});

async function tablaTurnos(datos) {

    msjTurnos.classList.add("disable");
    tBody.innerHTML = "";

    try {
        const res = await fetch("js/turnos.json")
        const turnos = await res.json();

        for (const turno of turnos) {
            if (datos.especialidad === turno.especialidad) {

                const fila = document.createElement("tr");

                fila.innerHTML =
                    `
                        <td>${turno.medico}</td>
                        <td>${turno.fecha}</td>
                        <td>${turno.hora}</td>
                        <td>${turno.especialidad}</td>
                    `
                agregarFilas(fila);
                tBody.appendChild(fila);
            }
        }

        table.appendChild(tBody);
        turnosDisponibles.classList.remove("disable");
        turnosDisponibles.classList.add("active");

    } catch (error) {
        console.error(err.message);
    }
}

function agregarFilas(fila) {

    fila.addEventListener("click", () => {

        turnosSeleccionados.classList.remove("disable");
        turnosSeleccionados.classList.add("active");

        fila.closest("tr").remove();

        turnosSeleccionados.innerHTML +=
            `
                <div class="flex-container">
                    <div class="flex-item-especialidad">
                        <div>
                            <h3 id="especialidadTurno" class="title-especificaciones especialidad">${fila.cells[3].textContent}</h3>
                        </div>
                    </div>
                    <div class="flex-item-medico">
                        <div>
                            <h4 id="medicoTurno" class="title-especificaciones medico">${fila.cells[0].textContent}</h4>
                            <h4 id="fechaTurno" class="title-especificaciones fecha">${fila.cells[1].textContent}</h4>
                            <h4 id="hsTurno" class="title-especificaciones hs">${fila.cells[2].textContent}</h4>
                        </div>
                    </div>
                    <div class="turnos-btn">
                        <button class="btn-reservar">Reservar</button>
                        <button class="btn-eliminar">Eliminar</button>
                    </div>
                </div>
            `

        if (tBody.querySelectorAll("tr").length === 0) {
            turnosDisponibles.classList.remove("active");
            turnosDisponibles.classList.add("disable");
        }

        reservarTurno();
        eliminarTurno();
    })
}

function eliminarTurno() {

    document.querySelectorAll(".turnos-btn .btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            Swal.fire({
                title: "¿Desea eliminar este turno de la lista?",
                text: "Podrá volver a seleccionarlo",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar de la lista",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {

                    const turnoEliminado = btn.closest(".flex-container");

                    const datosTurno = {
                        medico: turnoEliminado.querySelector(".medico").textContent,
                        fecha: turnoEliminado.querySelector(".fecha").textContent,
                        hs: turnoEliminado.querySelector(".hs").textContent,
                        especialidad: turnoEliminado.querySelector(".especialidad").textContent
                    }

                    turnoEliminado.remove();

                    const nuevaFila = document.createElement("tr");

                    nuevaFila.innerHTML =
                        `  
                            <td>${datosTurno.medico}</td>
                            <td>${datosTurno.fecha}</td>
                            <td>${datosTurno.hs}</td>
                            <td>${datosTurno.especialidad}</td>
                        `
                    tBody.appendChild(nuevaFila);
                    agregarFilas(nuevaFila);

                    turnosDisponibles.classList.remove("disable");
                    turnosDisponibles.classList.add("active");

                    if (document.querySelectorAll(".flex-container").length === 0) {
                        turnosSeleccionados.classList.add("disable");
                    }

                    Swal.fire({
                        title: "Turno eliminado de la reserva",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        })
    });;
}

let banderaAux = true;
let hayTurnos = false;
function reservarTurno() {
    document.querySelectorAll(".turnos-btn .btn-reservar").forEach(btn => {
        btn.addEventListener("click", async () => {
            const turnoReservado = btn.closest(".flex-container");

            const medico = turnoReservado.querySelector(".medico").textContent;
            const fecha = turnoReservado.querySelector(".fecha").textContent;
            const hs = turnoReservado.querySelector(".hora").textContent;
            const especialidad = turnoReservado.querySelector(".especialidad").textContent;
            const paciente = nombreReserva;
            const email = emailReserva;

            try {
                const res = await fetch("http://localhost:3000/api/reservas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ medico, fecha, hs, especialidad, paciente, email })
                });

                const respuesta = await res.json();
                if (respuesta.ok) {
                    await Swal.fire({
                        title: "Turno reservado con éxito!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    hayTurnos = true;
                    turnoReservado.remove();

                    if ((document.querySelectorAll(".flex-container").length === 1) && banderaAux) {
                        turnosSeleccionados.classList.remove("active");
                        turnosSeleccionados.classList.add("disable");
                        banderaAux = false;
                    }

                    if ((tBody.querySelectorAll("tr").length === 0) && (document.querySelectorAll(".flex-container").length === 1)) {
                        msjTurnos.classList.remove("disable");
                        msjTurnos.classList.add("active");
                    }

                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: respuesta.mensaje || "No se pudo reservar el turno",
                        confirmButtonText: "Aceptar"
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo conectar con el servidor",
                    confirmButtonText: "Aceptar"
                });
            }
        });
    });
}
