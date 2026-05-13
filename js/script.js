// JavaScript Document
let estudiantes = [];

function registrarEstudiante(){

    let nombre = document.getElementById("nombre").value.trim();
    let especialidad = document.getElementById("especialidad").value;
    let nota1 = Number(document.getElementById("nota1").value);
    let nota2 = Number(document.getElementById("nota2").value);
    let nota3 = Number(document.getElementById("nota3").value);

    if(nombre === "" || especialidad === ""){
        alert("Ingrese nombre y especialidad");
        return;
    }

    if(
        document.getElementById("nota1").value === "" ||
        document.getElementById("nota2").value === "" ||
        document.getElementById("nota3").value === ""
    ){
        alert("Ingrese todas las notas");
        return;
    }

    if(
        nota1 < 0 || nota1 > 20 ||
        nota2 < 0 || nota2 > 20 ||
        nota3 < 0 || nota3 > 20
    ){
        alert("Las notas deben estar entre 0 y 20");
        return;
    }

    let promedio = ((nota1 + nota2 + nota3) / 3).toFixed(2);
    let estado = promedio >= 13 ? "Aprobado" : "Desaprobado";

    estudiantes.push({
        nombre: nombre,
        especialidad: especialidad,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        promedio: promedio,
        estado: estado
    });

    mostrarTabla();
    limpiarCampos();
}

function mostrarTabla(){

    let tabla = document.getElementById("tablaEstudiantes");
    tabla.innerHTML = "";

    for(let i = 0; i < estudiantes.length; i++){

        let e = estudiantes[i];

        tabla.innerHTML += `
        <tr>
            <td>${e.nombre}</td>
            <td>${e.especialidad}</td>
            <td>${e.promedio}</td>
            <td class="${e.estado === 'Aprobado' ? 'aprobado' : 'desaprobado'}">
                ${e.estado}
            </td>
            <td>
                <button onclick="generarBoleta(${i})">Ver Boleta</button>
            </td>
        </tr>
        `;
    }
}

function generarBoleta(index){

    let e = estudiantes[index];
    let fecha = new Date().toLocaleDateString();
    let boleta = document.getElementById("boleta");

    boleta.style.display = "block";

    boleta.innerHTML = `
        <h2>I.E.S.T.P. SIGMUND FREUD</h2>
        <h2>BOLETA DE NOTAS</h2>

        <hr>

        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Nombre:</strong> ${e.nombre}</p>
        <p><strong>Especialidad:</strong> ${e.especialidad}</p>

        <hr>

        <p><strong>Nota 1:</strong> ${e.nota1}</p>
        <p><strong>Nota 2:</strong> ${e.nota2}</p>
        <p><strong>Nota 3:</strong> ${e.nota3}</p>

        <hr>

        <p><strong>Promedio Final:</strong> ${e.promedio}</p>

        <p>
            <strong>Estado:</strong>
            <span class="${e.estado === 'Aprobado' ? 'aprobado' : 'desaprobado'}">
                ${e.estado}
            </span>
        </p>

        <button onclick="guardarPDF()">Guardar como PDF</button>
    `;

    boleta.scrollIntoView({
        behavior: "smooth"
    });
}

function guardarPDF(){
    window.print();
}

function limpiarCampos(){
    document.getElementById("nombre").value = "";
    document.getElementById("especialidad").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
}