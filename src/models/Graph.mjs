import { Node } from "./Node.mjs";
import { LinKedList } from "../models/LinKedList.mjs";

class Graph {
  constructor() {
    this.listaAyacencia = new LinKedList
  }

  addVertice(u, v) {
    if (!this.listaAyacencia[u.next]) {
      this.listaAyacencia[u.next] = new LinKedList();
    }
    this.listaAyacencia[u.next].add(v);
  }
  bfs(startNode) {
    let queue = [];
    let visit = {};
    let history = {};
    let path = {};
  
    visit[startNode.next] = true;
    queue.push(startNode.next);
    history[startNode.next] = [];
    path[startNode.next] = null; 
  
    while (queue.length != 0) {
      let currentNode = queue.shift();
  
      let adjacentList = this.listaAyacencia[currentNode];
      if (adjacentList) {
        let node = adjacentList.getElementAt(0);
        while (node) {
          if (!visit[node.value.next]) {
            visit[node.value.next] = true;
            queue.push(node.value.next);
            history[node.value.next] = history[currentNode].concat(node.value.next);
            path[node.value.next] = currentNode;
          }
          node = node.next;
        }
      }
    }

    let result = [];
    for (const destination in history) {
      result.push({
        destination: destination,
        path: history[destination]
      });
    }
  
    return result;
  }
  convertToGraph(data, start, end) {
    const graph = {};
    for (const key in data) {
      graph[key] = {};
      let node = data[key].getElementAt(0);
      while (node) {
        graph[key][node.value.next] = node.value.value;
        node = node.next;
      }
    }

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
  }

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
