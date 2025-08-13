const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const msjErrorNombre = document.getElementById("msjErrorNombre");
const email = document.getElementById("email");
const msjErrorEmail = document.getElementById("msjErrorEmail");
const especialidad = document.getElementById("especialidad");
const msjErrorEspecialidad = document.getElementById("msjErrorEspecialidad");
const btn = document.getElementById("btn");

//VALIDACION DEL FORMULARIO
btn.addEventListener("click", (e) => {

    e.preventDefault();

    if (nombre.value.trim() === "") {
        msjErrorNombre.innerHTML = "<p>Complete con su nombre completo. Por ej: Facundo D'addese</p>";
        msjErrorNombre.classList.add("msjError");
        return;
    } else {
        msjErrorNombre.innerText = "";
    }

    if (email.value.trim() === "") {
        msjErrorEmail.innerHTML = "<p>Complete con un email. Por ej: facundo@gmail.com</p>";
        msjErrorEmail.classList.add("msjError");
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.value.trim())) {
        msjErrorEmail.innerHTML = "<p>Formato de email inválido. Por ej: facundo@gmail.com</p>";
        msjErrorEmail.classList.add("msjError");
        return;
    } else {
        msjErrorEmail.innerText = "";
    }

    if (especialidad.value.trim() === "") {
        msjErrorEspecialidad.innerHTML = "<p>Complete con una especialidad. Por ej: Kinesiología</p>";
        msjErrorEspecialidad.classList.add("msjError"); return;
    } else {
        msjErrorEspecialidad.innerText = "";
    }

    if ((nombre.value != "") && (email.value != "") && (especialidad.value != "")) {
        form.submit();
    }
})

const turnosDisponibles = document.getElementById("turnosDisponibles");

const turnos = [
    {
        numeroOrden: 1,
        nombrePaciente: "Juan Pérez",
        fechaTurno: "2025-08-15",
        horaTurno: "09:30",
        especialidad: "Odontología"
    },
    {
        numeroOrden: 2,
        nombrePaciente: "María Gómez",
        fechaTurno: "2025-08-15",
        horaTurno: "10:00",
        especialidad: "Cardiología"
    },
    {
        numeroOrden: 3,
        nombrePaciente: "Carlos Fernández",
        fechaTurno: "2025-08-16",
        horaTurno: "11:15",
        especialidad: "Pediatría"
    },
    {
        numeroOrden: 4,
        nombrePaciente: "Ana Rodríguez",
        fechaTurno: "2025-08-16",
        horaTurno: "14:00",
        especialidad: "Dermatología"
    },
    {
        numeroOrden: 5,
        nombrePaciente: "Luis Martínez",
        fechaTurno: "2025-08-17",
        horaTurno: "08:45",
        especialidad: "Neurología"
    },
    {
        numeroOrden: 6,
        nombrePaciente: "Sofía López",
        fechaTurno: "2025-08-17",
        horaTurno: "09:15",
        especialidad: "Ginecología"
    },
    {
        numeroOrden: 7,
        nombrePaciente: "Diego Torres",
        fechaTurno: "2025-08-18",
        horaTurno: "10:30",
        especialidad: "Kinesiología"
    },
    {
        numeroOrden: 8,
        nombrePaciente: "Valentina Castro",
        fechaTurno: "2025-08-18",
        horaTurno: "15:00",
        especialidad: "Clínica médica"
    },
    {
        numeroOrden: 9,
        nombrePaciente: "Martín Herrera",
        fechaTurno: "2025-08-19",
        horaTurno: "08:00",
        especialidad: "Nutrición"
    },
    {
        numeroOrden: 10,
        nombrePaciente: "Camila Sánchez",
        fechaTurno: "2025-08-19",
        horaTurno: "13:45",
        especialidad: "Psicología"
    }
];