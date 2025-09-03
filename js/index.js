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

const limpiarAdvertencias = () => {
    msjErrorNombre.innerText = "";
    msjErrorEmail.innerText = "";
    msjErrorEspecialidad.innerText = "";
}

//VALIDACION DEL FORMULARIO
btnConsultar.addEventListener("click", (e) => {

    e.preventDefault();

    if (nombre.value.trim() === "") {
        msjErrorNombre.innerHTML = "<p>Complete con su nombre completo. Por ej: Facundo D'addese</p>";
        msjErrorNombre.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if (email.value.trim() === "") {
        msjErrorEmail.innerHTML = "<p>Complete con un email. Por ej: facundo@gmail.com</p>";
        msjErrorEmail.classList.add("msjError");
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.value.trim())) {
        msjErrorEmail.innerHTML = "<p>Formato de email inválido. Por ej: facundo@gmail.com</p>";
        msjErrorEmail.classList.add("msjError");
        valid = false;
    } else {
        limpiarAdvertencias();
    }

    if (especialidad.value.trim() === "") {
        msjErrorEspecialidad.innerHTML = "<p>Complete con una especialidad. Por ej: Kinesiología</p>";
        msjErrorEspecialidad.classList.add("msjError");
        return;
    } else {
        limpiarAdvertencias();
    }

    if ((nombre.value != "") && (especialidad.value != "")) {
        tablaTurnos();
    }
})

async function tablaTurnos() {

    tBody.innerHTML = "";

    try {
        const res = await fetch("js/turnos.json")
        const turnos = await res.json();

        for (const turno of turnos) {
            if (especialidad.value === turno.especialidad) {

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
        console.log("Error: " + err.message);
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