const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const usuariosPath = path.join(__dirname, "usuarios.json");
const reservasPath = path.join(__dirname, "reservas.json");

app.post("/api/usuarios/registro", (req, res) => {
    const { nombre, emailRegistro, tel, claveRegistro } = req.body;

    if (!nombre || !emailRegistro || !tel || !claveRegistro) {
        return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, "utf-8"));

    const existe = usuarios.find(u => u.emailRegistro === emailRegistro);
    if (existe) {
        return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    usuarios.push({ nombre, emailRegistro, tel, claveRegistro });
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

    res.json({ mensaje: "Usuario registrado con éxito" });
});

app.post("/api/usuarios/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, "utf-8"));

    const usuario = usuarios.find(u => u.emailRegistro === email && u.claveRegistro === password);
    if (!usuario) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    res.json({ mensaje: "Login exitoso", usuario: { nombre: usuario.nombre, email: usuario.emailRegistro } });
});

app.get("/api/reservas", (req, res) => {
    const reservas = JSON.parse(fs.readFileSync(reservasPath, "utf-8"));
    res.json(reservas);
});

app.post("/api/reservas", (req, res) => {
    const { medico, fecha, hs, especialidad, paciente, email } = req.body;
    if (!medico || !fecha || !hs || !especialidad || !paciente || !email) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const reservas = JSON.parse(fs.readFileSync(reservasPath, "utf-8"));
    reservas.push({ medico, fecha, hs, especialidad, paciente, email });
    fs.writeFileSync(reservasPath, JSON.stringify(reservas, null, 2));

    res.json({ mensaje: "Reserva creada con éxito" });
});

app.delete("/api/reservas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let reservas = JSON.parse(fs.readFileSync(reservasPath, "utf-8"));

    if (id < 0 || id >= reservas.length) {
        return res.status(400).json({ mensaje: "Reserva no encontrada" });
    }

    reservas.splice(id, 1);
    fs.writeFileSync(reservasPath, JSON.stringify(reservas, null, 2));

    res.json({ mensaje: "Reserva eliminada con éxito" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
