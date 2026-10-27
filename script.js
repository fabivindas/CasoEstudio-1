const botonAgregar = document.getElementById("btnAgregar");
const tablaEstudiantes = document.getElementById("tablaEstudiantes");
const mensaje = document.getElementById("mensaje");

let estudiantes = [
    {
        nombre: "Maria",
        apellidos: "Mora Perez",
        nota: 90
    },
    {
        nombre: "Pedro",
        apellidos: "Sibaja Lopez",
        nota: 60
    },
    {
        nombre: "Marco",
        apellidos: "Rojas Castro",
        nota: 78
    }
];

function mostrarEstudiantes() {
    tablaEstudiantes.innerHTML = "";

    for (let index = 0; index < estudiantes.length; index++) {
        let estudiante = estudiantes[index];
        let claseNota = "";

        if (estudiante.nota >= 80) {
            claseNota = "nota-verde";
        } else if (estudiante.nota < 65) {
            claseNota = "nota-roja";
        }

        tablaEstudiantes.innerHTML += `
            <tr>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.apellidos}</td>
                <td class="${claseNota}">${estudiante.nota}</td>
            </tr>
        `;
    }

    actualizarResumen();
}

function actualizarResumen() {
    let mayor = estudiantes[0];
    let menor = estudiantes[0];
    let suma = 0;

    for (let index = 0; index < estudiantes.length; index++) {
        let estudiante = estudiantes[index];

        suma = suma + estudiante.nota;

        if (estudiante.nota > mayor.nota) {
            mayor = estudiante;
        }

        if (estudiante.nota < menor.nota) {
            menor = estudiante;
        }
    }

    let promedio = suma / estudiantes.length;

    document.getElementById("notaMayor").innerHTML =
        "Estudiante con la mayor nota: " +
        mayor.nombre + " " + mayor.apellidos +
        " (" + mayor.nota + ")";

    document.getElementById("promedio").innerHTML =
        "Promedio de notas: " + promedio.toFixed(2);

    document.getElementById("notaMenor").innerHTML =
        "Nota más baja: " + menor.nota +
        " - " + menor.nombre + " " + menor.apellidos;
}

botonAgregar.addEventListener("click", function() {
    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let nota = document.getElementById("nota").value;

    if (nombre == "" || apellidos == "" || nota == "") {
        mensaje.innerHTML = "Todos los campos son obligatorios.";
        mensaje.className = "error";

    } else if (isNaN(Number(nota)) ||
               Number(nota) < 0 ||
               Number(nota) > 100) {
        mensaje.innerHTML = "La nota debe ser un número entre 0 y 100.";
        mensaje.className = "error";

    } else {
        let estudiante = {
            nombre: nombre,
            apellidos: apellidos,
            nota: Number(nota)
        };

        estudiantes.push(estudiante);

        mostrarEstudiantes();

        mensaje.innerHTML = "Estudiante agregado correctamente.";
        mensaje.className = "exito";

        document.getElementById("nombre").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("nota").value = "";
    }
});

mostrarEstudiantes();
