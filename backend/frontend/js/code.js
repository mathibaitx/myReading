/*const URLBase = "http://localhost:3000";*/
const URLBase = "https://myreading.glitch.me";

const add = () =>{
    document.querySelector("#divModal").style.display = "flex";
    document.querySelector("#inputNombre").value = "";
    document.querySelector("#inputAutor").value = "";
}
document.querySelector("#spanAdd").addEventListener("click", add);

const closeModal = () =>{
    document.querySelector("#divModal").style.display = "none";
}
document.querySelector("#spanClose").addEventListener("click", closeModal);
document.querySelector("#inputModalAdd").addEventListener("click", closeModal);

const logOut = () =>{
    let confirmacion = confirm("¿Está seguro que desea cerrar sesión?");

    if(confirmacion){
        location.reload();
        document.querySelector("#inputLogInUsuario").value = "";
        document.querySelector("#inputLogInContraseña").value = "";
    }
}
document.querySelector("#spanLogOut").addEventListener("click", logOut);

const logInRegistrarse = () =>{
    document.querySelector("#divLogIn").style.display = "none";
    document.querySelector("#divRegister").style.display = "block";
}
document.querySelector("#inputLogInRegistrarse").addEventListener("click", logInRegistrarse);

const registerBack = () =>{
    document.querySelector("#divRegister").style.display = "none";
    document.querySelector("#divLogIn").style.display = "block";
}
document.querySelector("#spanBack").addEventListener("click", registerBack);

let usuarios;
let notas;

fetch(URLBase + "/usuarios")
    .then(r => r.json())
    .then(data => {
        console.log(data);
        usuarios = data;
});

const registrarUsuario = () => {
    let nombreCampo = document.querySelector("#inputRegNombre");
    let apellidoCampo = document.querySelector("#inputApellido");
    let emailCampo = document.querySelector("#inputEmail");
    let usuarioCampo = document.querySelector("#inputUsuario");
    let contraseñaCampo = document.querySelector("#inputContraseña");

    let campos = [nombreCampo, apellidoCampo, emailCampo, usuarioCampo, contraseñaCampo];

    let emailD = usuarios.some(usuario =>{
        if(usuario.email === emailCampo.value){
            return usuario;
        }
    })
    if(emailD == true){
        emailCampo.style.border = "1px solid red";
    }
    else{
        emailCampo.style.border = "1px solid green";
    }

    let usuarioD = usuarios.some(usuario =>{
        if(usuario.usuario === usuarioCampo.value){
            return usuario;
        }
    })
    if(usuarioD == true){
        usuarioCampo.style.border = "1px solid red";
    }
    else{
        usuarioCampo.style.border = "1px solid green";
    }
    
    if(usuarioCampo.value === ""){
        usuarioCampo.style.border = "1px solid red";
    }
    if(emailCampo.value === ""){
        emailCampo.style.border = "1px solid red";
    }
    if(nombreCampo.value === ""){
        nombreCampo.style.border = "1px solid red";
    }
    else{
        nombreCampo.style.border = "1px solid green";
    }
    if(apellidoCampo.value === ""){
        apellidoCampo.style.border = "1px solid red";
    }
    else{
        apellidoCampo.style.border = "1px solid green";
    }
    if(contraseñaCampo.value === ""){
        contraseñaCampo.style.border = "1px solid red";
    }
    else{
        contraseñaCampo.style.border = "1px solid green";
    }

    let registrado = campos.every(campo =>{
        if(campo.style.border == "1px solid green"){
            return campo;
        }
    });

    if(registrado == true){
        fetch(URLBase + "/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombreCampo.value,
                apellido: apellidoCampo.value,
                email: emailCampo.value,
                usuario: usuarioCampo.value,
                contraseña: contraseñaCampo.value,
            })
        })
            .then(r => r.json())
            .then(usuarioInsertado => {
                console.log(usuarioInsertado);
                usuarios.push(usuarioInsertado);
            });
        document.querySelector("#divRegister").style.display = "none";
        document.querySelector("#divLogIn").style.display = "block";
        alert("Sus datos han sido registrados con éxito");
    }
}
document.querySelector("#inputRegistrarse").addEventListener("click", registrarUsuario);

const logInUsuario = () =>{
    let usuarioCampo = document.querySelector("#inputLogInUsuario");
    let contraseñaCampo = document.querySelector("#inputLogInContraseña");

    let campos = [usuarioCampo, contraseñaCampo];

    let usuarioD = usuarios.some(usuario =>{
        if(usuario.usuario === usuarioCampo.value){
            return usuario;
        }
    })
    if(usuarioD == true){
        usuarioCampo.style.border = "1px solid green";
    }
    else{
        usuarioCampo.style.border = "1px solid red";
    }
    let usuarioD2 = usuarios.some(usuario =>{
        if(!(usuario.usuario === usuarioCampo.value) && !(usuario.contraseña === contraseñaCampo.value)){
            return usuario;
        }
    })
    if(usuarioD2 == true){
        usuarioCampo.style.border = "1px solid red";
        contraseñaCampo.style.border = "1px solid red";
    }

    let contraseñaD = usuarios.some(usuario =>{
        if((usuario.usuario === usuarioCampo.value) && !(usuario.contraseña === contraseñaCampo.value)){
            return usuario;
        }
    })
    if(contraseñaD == true){
        usuarioCampo.style.border = "1px solid green";
        contraseñaCampo.style.border = "1px solid red";
    }
    let contraseñaD2 = usuarios.some(usuario =>{
        if((usuario.usuario === usuarioCampo.value) && (usuario.contraseña === contraseñaCampo.value)){
            return usuario;
        }
    })
    if(contraseñaD2 == true){
        usuarioCampo.style.border = "1px solid green";
        contraseñaCampo.style.border = "1px solid green";
    }
    let contraseñaD3 = usuarios.some(usuario =>{
        if(!(usuario.usuario === usuarioCampo.value) && (usuario.contraseña === contraseñaCampo.value)){
            return usuario;
        }
    })
    if(contraseñaD3 == true){
        contraseñaCampo.style.border = "1px solid red";
    }
    if(contraseñaCampo.value === ""){
        contraseñaCampo.style.border = "1px solid red";
    }

    let ingresado = campos.every(campo =>{
        if(campo.style.border == "1px solid green"){
            return campo;
        }
    });

    if(ingresado == true){
        usuarios.forEach(usuario =>{
            if(usuario.usuario === usuarioCampo.value && usuario.contraseña === contraseñaCampo.value){
                document.querySelector("#h2NombreApellido").innerHTML = `${usuario.nombre} ${usuario.apellido}`;
            }
        })
        document.querySelector("#divLogIn").style.display = "none";
        document.querySelector("#divContent").style.display = "block";
    }
}
document.querySelector("#inputEntrar").addEventListener("click", logInUsuario);

fetch(URLBase + "/notas")
    .then(r => r.json())
    .then(data => {
        console.log(data);
        notas = data;
        sectionNotas();
});

const sectionNotas = () => {
    document.querySelector("section").innerHTML = "";
    notas.forEach(nota => {
        document.querySelector("section").innerHTML += `<article>
        <span class="spanCategoria">${nota.categoria}</span>
        <div>
            <h4>${nota.nombre}</h4>
            <p>${nota.autor}</p>
        </div>
        <span class="spanDelete"><i data-idNota="${nota._id}" class="fas fa-times"></i></span>
        </article>`;
    });
    let botones = document.querySelectorAll(".spanDelete");
    botones.forEach(boton => {
        boton.addEventListener("click", eliminarNotaBoton);
    });
}

const eliminarNotaBoton = evt => {
    let idNotaEliminar = evt.target.getAttribute("data-idNota");

    let confirmacion = confirm("¿Está seguro que desea eliminar?");

    if (confirmacion) {

        fetch(URLBase + "/notas/" + idNotaEliminar, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r => r.json())
            .then(notaEliminada => {
                console.log(notaEliminada);
                let idEliminada = notaEliminada._id;
                notas = notas.filter(nota => nota._id !== idEliminada);
                sectionNotas();
            });
    }
    document.querySelector("#inputTodo").checked = true;
}

const agregarNota = () => {
    let nombreCampo = document.querySelector("#inputNombre").value;
    let autorCampo = document.querySelector("#inputAutor").value;
    let categoriaCampo;

    let quieroLeer = document.querySelector("#inputModalQuieroLeer");
    let leyendo = document.querySelector("#inputModalLeyendo");
    let leido = document.querySelector("#inputModalLeido");
    
    if(quieroLeer.checked){
        categoriaCampo = quieroLeer.value;
    }
    else if(leyendo.checked){
        categoriaCampo = leyendo.value;
    }
    else if(leido.checked){
        categoriaCampo = leido.value;
    }

    fetch(URLBase + "/notas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombreCampo,
            autor: autorCampo,
            categoria: categoriaCampo,
        })
    })
        .then(r => r.json())
        .then(notaInsertada => {
            console.log(notaInsertada);
            notas.push(notaInsertada);
            sectionNotas();
        });
    document.querySelector("#inputTodo").checked = true;
}
document.querySelector("#inputModalAdd").addEventListener("click", agregarNota);

const filtroTodo = () =>{
    sectionNotas();
}
document.querySelector("#inputTodo").addEventListener("click", filtroTodo);

const filtroQuieroLeer = () =>{    
    let quieroLeer = (document.querySelector("#inputQuieroLeer")).value;
    
    let filtro = notas.filter(elemento => {
        if (elemento.categoria === quieroLeer) {
            return elemento;
        }
    });
    console.log(filtro);
    document.querySelector("section").innerHTML = "";
    filtro.forEach(nota => {
        document.querySelector("section").innerHTML += `<article>
        <span class="sape">${nota.categoria}</span>
        <div>
            <h4>${nota.nombre}</h4>
            <p>${nota.autor}</p>
        </div>
        <span class="spanDelete"><i data-idNota="${nota._id}" class="fas fa-times"></i></span>
        </article>`;
    });
    let botones = document.querySelectorAll(".spanDelete");
    botones.forEach(boton => {
        boton.addEventListener("click", eliminarNotaBoton);
    });
}
document.querySelector("#inputQuieroLeer").addEventListener("click", filtroQuieroLeer);


const filtroLeyendo = () =>{    
    let leyendo = (document.querySelector("#inputLeyendo")).value;
    
    let filtro = notas.filter(elemento => {
        if (elemento.categoria === leyendo) {
            return elemento;
        }
    });
    console.log(filtro);
    document.querySelector("section").innerHTML = "";
    filtro.forEach(nota => {
        document.querySelector("section").innerHTML += `<article>
        <span class="sape">${nota.categoria}</span>
        <div>
            <h4>${nota.nombre}</h4>
            <p>${nota.autor}</p>
        </div>
        <span class="spanDelete"><i data-idNota="${nota._id}" class="fas fa-times"></i></span>
        </article>`;
    });
    let botones = document.querySelectorAll(".spanDelete");
    botones.forEach(boton => {
        boton.addEventListener("click", eliminarNotaBoton);
    });
}
document.querySelector("#inputLeyendo").addEventListener("click", filtroLeyendo);

const filtroLeido = () =>{    
    let leido = (document.querySelector("#inputLeido")).value;
    
    let filtro = notas.filter(elemento => {
        if (elemento.categoria === leido) {
            return elemento;
        }
    });
    console.log(filtro);
    document.querySelector("section").innerHTML = "";
    filtro.forEach(nota => {
        document.querySelector("section").innerHTML += `<article>
        <span class="sape">${nota.categoria}</span>
        <div>
            <h4>${nota.nombre}</h4>
            <p>${nota.autor}</p>
        </div>
        <span class="spanDelete"><i data-idNota="${nota._id}" class="fas fa-times"></i></span>
        </article>`;
    });
    let botones = document.querySelectorAll(".spanDelete");
    botones.forEach(boton => {
        boton.addEventListener("click", eliminarNotaBoton);
    });
}
document.querySelector("#inputLeido").addEventListener("click", filtroLeido);