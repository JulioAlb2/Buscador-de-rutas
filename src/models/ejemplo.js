// Definición del grafo inicial
const graph = {
    'Tuxtla': {'start': 1, 'Guadalupe': 2, 'end': 3},
    'Copainala': {'Guadalupe': 5},
    'Guadalupe': {'end': 9, 'Pijijiapan': 6},
    'end': {'Pijijiapan': 7},
    'start': {'Copainala': 4}
};

// Convertir la estructura de datos a un formato utilizable por Dijkstra
const convertToGraph = (data, start, end) => {
    const graph = {};

    // Crear conexiones bidireccionales
    for (const key in data) {
        if (!graph[key]) {
            graph[key] = {};
        }
        for (const neighbor in data[key]) {
            const weight = data[key][neighbor];
            graph[key][neighbor] = weight;
            if (!graph[neighbor]) {
                graph[neighbor] = {};
            }
            graph[neighbor][key] = weight;
        }
    }

    // Renombrar nodos según los valores seleccionados
    graph.start = graph[start];
    delete graph[start];

    for (const key in graph) {
        for (const subKey in graph[key]) {
            if (subKey === start) {
                graph[key].start = graph[key][subKey];
                delete graph[key][subKey];
            }
        }
    }

    for (const key in graph) {
        for (const subKey in graph[key]) {
            if (subKey === end) {
                graph[key].end = graph[key][subKey];
                delete graph[key][subKey];
            }
        }
    }

    graph.end = {};

    return graph;
};


function dijkstraAlgorithm(graph) {
    const costs = Object.assign({ end: Infinity }, graph.start);
    const parents = { end: null };
    const processed = [];

    let node = findLowestCostNode(costs, processed);

    while (node) {
        let cost = parseInt(costs[node]);  // Asegurarse de que 'cost' sea un entero
        let children = graph[node];
        for (let n in children) {
            let newCost = cost + children[n];
            if (!costs[n] || costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
            }
        }
        processed.push(node);
        node = findLowestCostNode(costs, processed);
    }

    let optimalPath = ['end'];
    let parent = parents.end;
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    return { distance: costs.end, path: optimalPath };
}

function findLowestCostNode(costs, processed) {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
}



// Inicialización y prueba
const lugarInicial = 'start';
const lugarFinal = 'end';

// Convertir la estructura de datos usando los valores seleccionados
const newGraph = convertToGraph(graph, lugarInicial, lugarFinal);
console.log("Converted Graph:", newGraph);

// Ejecutar el algoritmo de Dijkstra
const result = dijkstraAlgorithm(newGraph);
console.log(result);
