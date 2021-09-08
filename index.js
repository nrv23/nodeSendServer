const express = require("express");
const app = express();
const http = require("http");
const conectarDB = require("./config/db");

conectarDB();

app.use(express.json());


//cargar rutas

const rutaUsuarios = require("./routes/usuarios");
const rutaAuth = require("./routes/auth");
const rutaEnlaces = require("./routes/enlaces");
const rutaArchivos = require("./routes/archivos");


app.use('/api/usuarios',rutaUsuarios());
app.use('/api/auth',rutaAuth());
app.use('/api/enlaces',rutaEnlaces());
app.use('/api/archivos',rutaArchivos());



const Server = http.createServer(app);
const PORT = process.env.PORT || 6000;
Server.listen(PORT,'0.0.0.0',() => {
    console.log("Servidor escuchando en puerto "+PORT)
})