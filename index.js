const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const usuariosPath = path.join(__dirname, "usuarios.json");
const reservasPath = path.join(__dirname, "reservas.json");

// Función para leer JSON, si no existe retorna [ ]
function leerJSON(ruta) {
    if (fs.existsSync(ruta)) {
        return JSON.parse(fs.readFileSync(ruta, "utf-8"));
    }
    return [];
}

// Función para guardar JSON
function guardarJSON(ruta, data) {
    fs.writeFileSync(ruta, JSON.stringify(data, null, 2));
}

// Registro de usuario
app.post("/api/usuarios/registro", (req, res) => {

    const { nombreRegistro, emailRegistro, telefonoRegistro, claveRegistro } = req.body;

    if (!nombreRegistro || !emailRegistro || !telefonoRegistro || !claveRegistro) {
        return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const usuarios = leerJSON(usuariosPath);

    // Verificar si el email ya existe
    const existe = usuarios.find(u => u.emailRegistro.toLowerCase() === emailRegistro.toLowerCase());
    if (existe) {
        return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    usuarios.push({ nombreRegistro, emailRegistro, telefonoRegistro, claveRegistro });
    guardarJSON(usuariosPath, usuarios);

    res.json({ ok: true, mensaje: "Usuario registrado con éxito" });
});

// Login
app.post("/api/usuarios/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const usuarios = leerJSON(usuariosPath);

    // Usamos los mismos nombres que guardamos
    const usuario = usuarios.find(u => u.emailRegistro.toLowerCase() === email.toLowerCase() && u.claveRegistro === password);
    if (!usuario) {
        return res.status(401).json({ mensaje: "Email y/o clave incorrecta" });
    }

    res.json({ ok: true, mensaje: "Login exitoso", usuario: { nombre: usuario.nombreRegistro, email: usuario.emailRegistro } });
});

// Obtener reservas
app.get("/api/reservas", (req, res) => {
    const reservas = leerJSON(reservasPath);
    res.json(reservas);
});

// Crear reserva    
app.post("/api/reservas", (req, res) => {
    const { medico, fecha, hs, especialidad, paciente, email } = req.body;

    if (!medico || !fecha || !hs || !especialidad || !paciente || !email) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const reservas = leerJSON(reservasPath);
    reservas.push({ medico, fecha, hs, especialidad, paciente, email });
    guardarJSON(reservasPath, reservas);

    res.json({ ok: true, mensaje: "Reserva creada con éxito" });
});

// Eliminar reserva
app.delete("/api/reservas/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const reservas = leerJSON(reservasPath);

    if (id < 0 || id >= reservas.length) {
        return res.status(400).json({ mensaje: "Reserva no encontrada" });
    }

    reservas.splice(id, 1);
    guardarJSON(reservasPath, reservas);

    res.json({ ok: true, mensaje: "Reserva eliminada con éxito" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});