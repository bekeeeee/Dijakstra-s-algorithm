import { PriorityQueue } from "./priority-queue";

type AdjacencyList = {
  [key: string]: { node: string; weight: number }[];
};

class WeightedGraph2 {
  private adjacencyList: AdjacencyList;
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: string) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(v1: string, v2: string, weight: number) {
    this.adjacencyList[v2].push({ node: v1, weight });
    this.adjacencyList[v1].push({ node: v2, weight });
  }
  Dijkstra(start: string, finish: string) {
    const nodes = new PriorityQueue();
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    let smallest: string | undefined;
    let path: string[] = [];
    // build up initial state.
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // console.log("distances", distances);
    // console.log("nodes", nodes);
    // console.log("previous", previous);

    while (nodes.values.length) {
      smallest = nodes.dequeue()?.val;
      if (smallest === finish) {
        // console.log("distances", distances);
        // console.log("previous", previous);
        // console.log("smallest", smallest);
        path.unshift(smallest);

        while (previous[finish]) {
          path.unshift(previous[finish]!);
          finish = previous[finish]!;
        }
        // path.unshift(start);
        console.log("path", path);
        return path;
      }
      // console.log("adjacencyList==: " + JSON.stringify(this.adjacencyList));
      // console.log(
      //   "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- "
      // );
      if (smallest || distances[smallest!] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest!]) {
          let nextNode = this.adjacencyList[smallest!][neighbor];
          // console.log(
          //   "adjacencyList: " + JSON.stringify(this.adjacencyList[smallest!])
          // );
          // console.log(
          //   "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- "
          // );

          // console.log("nextNode: " + JSON.stringify(nextNode));
          // console.log(
          //   "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- "
          // );

          let candidate = distances[smallest!] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest!;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
  }
}

let _graph = new WeightedGraph2();
_graph.addVertex("A");
_graph.addVertex("B");
_graph.addVertex("C");
_graph.addVertex("D");
_graph.addVertex("E");
_graph.addVertex("F");

_graph.addEdge("A", "B", 4);
_graph.addEdge("A", "C", 2);
_graph.addEdge("B", "E", 3);
_graph.addEdge("C", "D", 2);
_graph.addEdge("C", "F", 4);
_graph.addEdge("D", "E", 3);
_graph.addEdge("D", "F", 1);
_graph.addEdge("E", "F", 1);

_graph.Dijkstra("A", "E");
_graph.Dijkstra("A", "C");
_graph.Dijkstra("A", "D");
_graph.Dijkstra("A", "F");
