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

  dijkstraAlgorithm(graph, lugarFinal) {
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

    let optimalPath = [lugarFinal];
    let parent = parents.end;
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    // optimalPath.push(lugarInicial)
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

  getAdjacentNodes(node) {
    return this.listaAyacencia[node.next] || [];
  }
}


export { Graph };