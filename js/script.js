const divLoggin = document.getElementById("div-loggin");
const formloggin = document.getElementById("form-loggin");
const btnIniciarSesion = document.getElementById("btn-iniciar-sesion");
const msjErrorLoggin = document.getElementById("msjErrorLoggin");
const msjErrorContraseña = document.getElementById("msjErrorContraseña");
const btnRegistrarse = document.getElementById("btn-registrarse");
const divRegistrarse = document.getElementById("div-registrarse");
const formRegistrarse = document.getElementById("form-registrarse");
const msjErrorNombreRegistro = document.getElementById("msjErrorNombreRegistro");
const msjErrorEmailRegistro = document.getElementById("msjErrorEmailRegistro");
const msjErrorTel = document.getElementById("msjErrorTel");
const msjErrorClaveRegistro = document.getElementById("msjErrorClaveRegistro")
const btnRegistro = document.getElementById("btn-registro");
const consultarTurnos = document.getElementById("consultar-turnos");
const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const msjErrorNombre = document.getElementById("msjErrorNombre");
const email = document.getElementById("email");
const msjErrorEmail = document.getElementById("msjErrorEmail");
const especialidad = document.getElementById("especialidad");
const msjErrorEspecialidad = document.getElementById("msjErrorEspecialidad");
const btnConsultar = document.getElementById("btn-consultar");
const turnosDisponibles = document.getElementById("turnos-disponibles");
const turnosSeleccionados = document.getElementById("turnos-seleccionados");
const table = document.getElementById("table");
const tBody = document.createElement("tbody");
const msjTurnos = document.getElementById("msj-turnos");
const h2MsjTurnos = document.getElementById("title-msj-turnos");

const limpiarAdvertencias = () => {
    msjErrorContraseña.innerText = "";
    msjErrorContraseña.classList.remove("msjError");
    msjErrorNombreRegistro.innerText = "";
    msjErrorNombreRegistro.classList.remove("msjError");
    msjErrorNombre.innerText = "";
    msjErrorNombre.classList.remove("msjError");
    msjErrorEmail.innerText = "";
    msjErrorEmail.classList.remove("msjError");
    msjErrorEspecialidad.innerText = "";
    msjErrorEspecialidad.classList.remove("msjError");
    msjErrorEmailRegistro.innerText = "";
    msjErrorEmailRegistro.classList.remove("msjError");
    msjErrorTel.innerText = "";
    msjErrorTel.classList.remove("msjError");
    msjErrorClaveRegistro.innerText = "";
    msjErrorClaveRegistro.classList.remove("msjError");
}

btnIniciarSesion.onclick = async (event) => {
    event.preventDefault();

    const formData = new FormData(formloggin);
    const datos = Object.fromEntries(formData.entries());

    console.log(datos);

    if (datos.email.trim() === "") {
        msjErrorLoggin.innerHTML = "<p>Complete con un email. Por ej: facundo@gmail.com</p>";
        msjErrorLoggin.classList.add("msjError");
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(datos.email.trim())) {
        msjErrorLoggin.innerHTML = "<p>Formato de email inválido. Por ej: facundo@gmail.com</p>";
        msjErrorLoggin.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
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
        msjErrorContraseña.innerHTML = "<p>La contraseña debe tener al menos 8 caracteres/p>";
        msjErrorContraseña.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if (datos.email !== "" && datos.password !== "") {
        divLoggin.classList.add("disable");
        consultarTurnos.classList.remove("disable");
    }
}

btnRegistrarse.onclick = (event) => {
    event.preventDefault();
    divLoggin.classList.add("disable");
    divRegistrarse.classList.remove("disable");
    divRegistrarse.classList.add("loggin");
}

btnRegistro.onclick = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRegistrarse);
    const datos = Object.fromEntries(formData.entries());

    if (datos.nombre.trim() === "") {
        msjErrorNombreRegistro.innerHTML = "<p>Complete con su nombre completo. Por ej: Facundo D'addese</p>";
        msjErrorNombreRegistro.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if (datos.emailRegistro.trim() === "") {
        msjErrorEmailRegistro.innerHTML = "<p>Complete con un email. Por ej: facundo@gmail.com</p>";
        msjErrorEmailRegistro.classList.add("msjError");
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(datos.emailRegistro.trim())) {
        msjErrorEmailRegistro.innerHTML = "<p>Formato de email inválido. Por ej: facundo@gmail.com</p>";
        msjErrorEmailRegistro.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if (datos.tel.trim() === "") {
        msjErrorTel.innerHTML = "<p>Por favor, ingrese un número de teléfono.</p>";
        msjErrorTel.classList.add("msjError");
        return;
    } else if (!/^\d{8,15}$/.test(datos.tel.trim())) {
        msjErrorTel.innerHTML = "<p>Ingrese un teléfono válido (solo números, mínimo 8 dígitos).</p>";
        msjErrorTel.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if (datos.claveRegistro.trim() === "") {
        msjErrorClaveRegistro.innerHTML = "<p>La constraseña no puede estar vacia</p>";
        msjErrorClaveRegistro.classList.add("msjError");
        return;
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(datos.claveRegistro)) {
        msjErrorClaveRegistro.innerHTML = "<p>La constraseña debe contener al menos una letra y un número</p>";
        msjErrorClaveRegistro.classList.add("msjError");
        return;
    } else if (datos.claveRegistro.length < 8) {
        msjErrorClaveRegistro.innerHTML = "<p>La contraseña debe tener al menos 8 caracteres/p>";
        msjErrorClaveRegistro.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if (datos.nombre != "" && datos.emailRegistro !== "" && datos.tel !== "" && datos.claveRegistro !== "") {
        divRegistrarse.classList.add("disable");
        consultarTurnos.classList.remove("disable");
    }
}

btnConsultar.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    if (datos.nombreTurno.trim() === "") {
        msjErrorNombre.innerHTML = "<p>Complete con su nombre completo. Por ej: Facundo D'addese</p>";
        msjErrorNombre.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if (datos.emailTurno.trim() === "") {
        msjErrorEmail.innerHTML = "<p>Complete con un email. Por ej: facundo@gmail.com</p>";
        msjErrorEmail.classList.add("msjError");
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(datos.emailTurno.trim())) {
        msjErrorEmail.innerHTML = "<p>Formato de email inválido. Por ej: facundo@gmail.com</p>";
        msjErrorEmail.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if (!datos.especialidad || datos.especialidad.trim() === "") {
        msjErrorEspecialidad.innerHTML = "<p>Complete con una especialidad. Por ej: Kinesiología</p>";
        msjErrorEspecialidad.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if (datos.nombreTurno !== "" && datos.emailturno !== "" && datos.especialidad !== "") {
        tablaTurnos(datos);
    }
})

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
                            <h3 class="title-especificaciones especialidad">${fila.cells[3].textContent}</h3>
                        </div>
                    </div>
                    <div class="flex-item-medico">
                        <div>
                            <h4 class="title-especificaciones medico">${fila.cells[0].textContent}</h4>
                            <h4 class="title-especificaciones fecha">${fila.cells[1].textContent}</h4>
                            <h4 class="title-especificaciones hs">${fila.cells[2].textContent}</h4>
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

function reservarTurno() {

    document.querySelectorAll(".turnos-btn .btn-reservar").forEach(btn => {
        btn.addEventListener("click", () => {

            const turnoReservado = btn.closest(".flex-container");

            const datosTurno = {
                medico: turnoReservado.querySelector(".medico").textContent,
                fecha: turnoReservado.querySelector(".fecha").textContent,
                hs: turnoReservado.querySelector(".hs").textContent,
                especialidad: turnoReservado.querySelector(".especialidad").textContent
            }

            Swal.fire({
                title: "Detalles del turno",
                html:
                    `
                        <div style="text-align: left; font-size: 16px;">
                        <p style="padding: 5px;"><strong style="padding: 4px;">👤 Paciente:</strong>${nombre.value}</p>
                        <p style="padding: 5px;"><strong style="padding: 4px;">📧 Correo electrónico:</strong>${email.value}</p>
                        <p style="padding: 5px;"><strong style="padding: 4px;">👨‍⚕️ Médico:</strong>${datosTurno.medico}</p>
                        <p style="padding: 5px;"><strong style="padding: 4px;">📅 Fecha:</strong>${datosTurno.fecha}</p>
                        <p style="padding: 5px;"><strong style="padding: 4px;">⏰ Hora:</strong>${datosTurno.hs}</p>
                        <p style="padding: 5px;"><strong style="padding: 4px;">🏥 Especialidad:</strong>${datosTurno.especialidad}</p>
                        </div>
                    `,
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    //funcionó asi
                    let banderaAux = true;
                    if ((document.querySelectorAll(".flex-container").length === 1) && (banderaAux)) {
                        turnosSeleccionados.classList.remove("active");
                        turnosSeleccionados.classList.add("disable");
                        banderaAux = false;
                    }

                    if ((tBody.querySelectorAll("tr").length === 0) && ((document.querySelectorAll(".flex-container").length === 1))) {
                        msjTurnos.classList.remove("disable");
                        msjTurnos.classList.add("active");
                    }

                    Swal.fire({
                        title: "Turno reservado con éxito!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    turnoReservado.remove();
                }
            })
        })
    })
}
