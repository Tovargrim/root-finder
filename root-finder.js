class Graph {
    constructor() {
      this.vertices = [];
      this.edges = {};
    }
  
    addVertex(vertex) {
      this.vertices.push(vertex);
      this.edges[vertex] = {};
    }
  
    addEdge(vertex1, vertex2, weight) {
      this.edges[vertex1][vertex2] = weight;
      this.edges[vertex2][vertex1] = weight;
    }
  
    findShortestPath(startVertex, endVertex) {
      const distances = {};
      const previousVertices = {};
      const visited = [];
  
      this.vertices.forEach((vertex) => {
        distances[vertex] = Infinity;
      });
  
      distances[startVertex] = 0;
  
      while (visited.length < this.vertices.length) {
        const currentVertex = this.getMinDistanceVertex(distances, visited);
        visited.push(currentVertex);
  
        if (currentVertex === endVertex) {
          break;
        }
  
        const neighbors = this.getNeighbors(currentVertex);
  
        neighbors.forEach((neighbor) => {
          const distance = distances[currentVertex] + this.edges[currentVertex][neighbor];
          if (distance < distances[neighbor]) {
            distances[neighbor] = distance;
            previousVertices[neighbor] = currentVertex;
          }
        });
      }
  
      const shortestPath = this.constructShortestPath(previousVertices, startVertex, endVertex);
      return shortestPath;
    }
  
    getMinDistanceVertex(distances, visited) {
      return this.vertices.reduce((minVertex, vertex) => {
        if (!visited.includes(vertex) && distances[vertex] < distances[minVertex]) {
          return vertex;
        }
        return minVertex;
      });
    }
  
    getNeighbors(vertex) {
      return Object.keys(this.edges[vertex]);
    }
  
    constructShortestPath(previousVertices, startVertex, endVertex) {
      const path = [endVertex];
      let currentVertex = endVertex;
  
      while (currentVertex !== startVertex) {
        currentVertex = previousVertices[currentVertex];
        path.unshift(currentVertex);
      }
  
      return path;
    }
  }
  
  const graph = new Graph();
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');
  graph.addVertex('E');
  graph.addEdge('A', 'B', 4);
  graph.addEdge('A', 'C', 2);
  graph.addEdge('B', 'E', 3);
  graph.addEdge('C', 'D', 2);
  graph.addEdge('D', 'E', 3);
  
  const shortestPath = graph.findShortestPath('A', 'E');
  console.log('Кратчайший путь в графе:', shortestPath);
  