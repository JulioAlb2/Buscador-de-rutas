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
}

// let node= new Node(0,"h")
// let node2= new Node(4,"a")
// let node3 =new Node (5,"b")
// let node4 =new Node (1,"d")
// let node5 =new Node (15,"c")
// let grafo = new Graph()

//   //lugar inicial y lugar final
// grafo.addVertice(node,node2)//0,1
// grafo.addVertice(node,node3)//0,2
// grafo.addVertice(node2,node4)//0,2
// grafo.addVertice(node2,node5)//0,2
// // grafo.addVertice(1,3)
// // grafo.addVertice(1,4)
// // grafo.addVertice(2,4)
// console.log ("Breadth First Traversal starting from vertex 0: ")
// console.log(grafo.listaAyacencia)
// grafo.bfs(node)

export { Graph };
