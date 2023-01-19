let express = require("express");
let app = express();
require("dotenv").config();
let puerto = process.env.PORT || 3000;
let mongoose = require("mongoose");
let cors = require("cors");
let userDB = process.env.DB_USER;
let passDB = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${userDB}:${passDB}@cluster0.ew7gd.mongodb.net/myReading?retryWrites=true&w=majority`);
let db = mongoose.connection;
db.once("open", () => console.log("Conectado a base"));

app.use(cors());
app.use(express.json());
app.use("/", express.static("frontend"));

let notaSchema = new mongoose.Schema({
    nombre: String,
    autor: String,
    categoria: String,
});
let Nota = mongoose.model("Nota", notaSchema);

app.get("/notas", (req, res) =>{
    Nota.find((err, notas) =>{
        if (err) {
            res.json({ mensaje: "Error" });
        } else {
            res.json(notas);
        }
    });
});

app.post("/notas", (req, res) =>{
    let notaNueva = new Nota({
        nombre: req.body.nombre,
        autor: req.body.autor,
        categoria: req.body.categoria,
    });

    notaNueva.save((err, notaInsertada) => {
        if (err) {
            res.json({ mensaje: "Error" });
        } else {
            res.json(notaInsertada);
        }
    });
})

app.delete("/notas/:idEliminar", (req, res) =>{
    Nota.findByIdAndDelete(req.params.idEliminar, (err, notaEliminada) =>{
        if(err){
            res.json({mensaje: "Error"})
        }
        else{
            res.json(notaEliminada)
        }
    })
});

let usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    usuario: String,
    contraseña: String,
});
let Usuario = mongoose.model("Usuario", usuarioSchema);

app.get("/usuarios", (req, res) =>{
    Usuario.find((err, notas) =>{
        if (err) {
            res.json({ mensaje: "Error" });
        } else {
            res.json(notas);
        }
    });
});

app.post("/usuarios", (req, res) =>{
    let usuarioNuevo = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        usuario: req.body.usuario,
        contraseña: req.body.contraseña,
    });

    usuarioNuevo.save((err, usuarioInsertado) => {
        if (err) {
            res.json({mensaje: "Error"});
        } else {
            res.json(usuarioInsertado);
        }
    });
})

app.use((req, res, next) => {
    res.statusCode = 404;
    res.json({ mensaje: "Error"});
})

app.listen(3000 ,() => {
    console.log("Servidor ejecutado");
})