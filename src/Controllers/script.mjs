import { Graph } from "../models/Graph.mjs";
import { Node } from "../models/Node.mjs";

let grafo = new Graph();

let btnGuardarNombreCiudades = document.getElementById("btn-2");
let btnGuardarHoras = document.getElementById("guardarHoras");
let btnInicarRecorrido = document.getElementById("inicarRecorrido");
let btnDijkstra = document.getElementById("IniciarDijkstra");

btnGuardarNombreCiudades.addEventListener("click", () => {
    let name = document.getElementById("nameInput").value;

    if (name) {
        let names = JSON.parse(localStorage.getItem("names")) || [];
        names.push(name);
        localStorage.setItem("names", JSON.stringify(names));
        document.getElementById("nameInput").value = "";
        alert("Nombre de la ciudad añadido correctamente: " + name);
        populateSelects()
    }
});

function populateSelects() {
    const names = JSON.parse(localStorage.getItem("names")) || [];
    const select1 = document.getElementById("select1");
    const select2 = document.getElementById("select2");
    const select3 = document.getElementById("select3");
    const select4 = document.getElementById("select4");
    const select5 = document.getElementById("select5");
    select1.innerHTML = '<option value="">Seleccionar Nombre</option>';
    select2.innerHTML = '<option value="">Seleccionar Nombre</option>';
    select3.innerHTML = '<option value="">Seleccionar Nombre</option>';
    select4.innerHTML = '<option value="">Seleccionar Nombre</option>';
    select5.innerHTML = '<option value="">Seleccionar Nombre</option>';

    names.forEach((name) => {
        const option1 = document.createElement("option");
        option1.value = name;
        option1.textContent = name;
        select1.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = name;
        option2.textContent = name;
        select2.appendChild(option2);

        const option3 = document.createElement("option");
        option3.value = name;
        option3.textContent = name;
        select3.appendChild(option3);

        const option4 = document.createElement("option");
        option4.value = name;
        option4.textContent = name;
        select4.appendChild(option4);

        const option5 = document.createElement("option");
        option5.value = name;
        option5.textContent = name;
        select5.appendChild(option5);
    });
}

btnGuardarHoras.addEventListener("click", () => {
    const lugarInicial = document.getElementById("select1").value;
    const lugarFinal = document.getElementById("select2").value;
    const horas = parseInt(document.getElementById("horas").value);

    if (lugarInicial && lugarFinal && horas) {
        let nodeInicial = new Node(0, lugarInicial);
        let nodeFinal = new Node(horas, lugarFinal);
        let nodeInicialReverse = new Node(horas, lugarInicial);

        grafo.addVertice(nodeInicial, nodeFinal);
        grafo.addVertice(nodeFinal, nodeInicialReverse);
        console.log(grafo.listaAyacencia);
        alert("Horas de camino añadidas correctamente: " + lugarInicial + " a " + lugarFinal + " - " + horas + " horas");

        const horasList = document.getElementById("horasList");
        const li = document.createElement("li");
        li.textContent = `De ${lugarInicial} a ${lugarFinal}: ${horas} horas`;
        horasList.appendChild(li);
    } else {
        alert("Por favor, complete todos los campos para guardar las horas de camino.");
    }
});

btnInicarRecorrido.addEventListener("click", () => {
    const lugarInicial = document.getElementById("select3").value;
    let nodeInicial = new Node(0, lugarInicial);

    let history = grafo.bfs(nodeInicial);
    console.log(history);

    const recorridoList = document.getElementById("recorridoList");
    recorridoList.innerHTML = "";
    history.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        recorridoList.appendChild(li);
    });
});

btnDijkstra.addEventListener("click", () => {
    let lugarInicial = document.getElementById("select4").value;
    let lugarFinal = document.getElementById("select5").value;

    let graph = grafo.convertToGraph(grafo.listaAyacencia, lugarInicial, lugarFinal);
    console.log(graph);
    let history = grafo.dijkstraAlgorithm(graph);
    console.log(history);

    displayResult(history);
});

window.onload = () => {
    populateSelects();
};

function displayResult(result) {
    const resultBox = document.getElementById("result");
    resultBox.style.display = "block"; // Show the result box
    resultBox.innerHTML = `
        <h3>Resultados del Algoritmo de Dijkstra</h3>
        <p><strong>Distancia:</strong> ${result.distance}</p>
        <p><strong>Ruta:</strong> ${result.path.join(" -> ")}</p>
    `;
}
