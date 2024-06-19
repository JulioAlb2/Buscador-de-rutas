import { Node } from "./Node.mjs";

class Graph {
  constructor() {
    this.listaAyacencia = {};
  }

  addVertice(u, v) {
    if (!this.listaAyacencia[u.next]) {
      this.listaAyacencia[u.next] = [];
    }
    this.listaAyacencia[u.next].push(v);
  }

  bfs(startNode) {
    let queue = [];
    let visit = new Array(Object.keys(this.listaAyacencia).length).fill(false);
    let history = [];
    visit[startNode.next] = true; //.next
    queue.push(startNode.next); //.next
    history.push(startNode.next);

    // console.log(queue);

    while (queue.length != 0) {
      let curretNode = queue.shift();
      // console.log(curretNode + " ");

      for (let verticeAdyacente of this.listaAyacencia[curretNode] || []) {
        if (!visit[verticeAdyacente.next]) {
          visit[verticeAdyacente.next] = true;
          queue.push(verticeAdyacente.next);
          history.push(verticeAdyacente.next);
        }
      }
    }
    return history;
  }

  convertToGraph = (data, start, end) => {
    const graph = {};
    for (const key in data) {
      graph[key] = {};
      data[key].forEach((node) => {
        graph[key][node.next] = node.value;
      });
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

  dijkstraAlgorithm(graph) {
    const costs = Object.assign({ end: Infinity }, graph.start);
    const parents = { end: null };
    const processed = [];

    let node = this.findLowestCostNode(costs, processed);

    while (node) {
      let cost = costs[node];
      let children = graph[node];
      for (let n in children) {
        let newCost = cost + children[n];
        if (!costs[n] || costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
        }
      }
      processed.push(node);
      node = this.findLowestCostNode(costs, processed);
    }

    let optimalPath = ["end"];
    let parent = parents.end;
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    optimalPath.reverse();

    return { distance: costs.end, path: optimalPath };
  }

  findLowestCostNode(costs, processed) {
    return Object.keys(costs).reduce((lowest, node) => {
      if (lowest === null || costs[node] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return lowest;
    }, null);
  }
}

let node = new Node(0, "h");
let node2 = new Node(4, "a");
let node3 = new Node(5, "b");
let node4 = new Node(1, "d");
let node5 = new Node(15, "c");
let grafo = new Graph();

// lugar inicial y lugar final
grafo.addVertice(node, node2); //0,1
grafo.addVertice(node, node3); //0,2
grafo.addVertice(node2, node4); //0,2
grafo.addVertice(node2, node5); //0,2
grafo.addVertice(1, 3);
grafo.addVertice(1, 4);
grafo.addVertice(2, 4);
console.log("Breadth First Traversal starting from vertex 0: ");
console.log(grafo.listaAyacencia);
grafo.bfs(node);
const graph = grafo.convertToGraph(grafo.listaAyacencia);
const result = grafo.dijkstraAlgorithm(graph);
console.log("distancia mas corta " + result);

export { Graph };
