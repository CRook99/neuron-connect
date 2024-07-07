import { Coordinate } from "../utils/types";

type Node = {
    coord: Coordinate;
    occupied: boolean;
}

export class Graph {
    rows: number;
    cols: number;
    adjacencyList: Map<Node, Node[]>;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.adjacencyList = new Map();
        this.createGrid();
    }

    addNode(node: Node) {
        if (this.adjacencyList.has(node)) return;

        this.adjacencyList.set(node, []);
    }

    addEdge(a: Node, b: Node) {
        this.adjacencyList.get(a)?.push(b);
        this.adjacencyList.get(b)?.push(a);
    }

    createGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node: Node = {
                    coord: {x: row, y: col},
                    occupied: false
                };
                this.addNode(node);

                if (col < this.cols - 1) {
                    const right: Node = {
                        coord: {x: row, y: col + 1},
                        occupied: false
                    };
                    this.addEdge(node, right);
                }

                if (row < this.rows - 1) {
                    const bottom: Node = {
                        coord: {x: row + 1, y: col},
                        occupied: false
                    };
                    this.addEdge(node, bottom);
                }
            }
        }
    }

    bfs(start: Node, end: Node): Coordinate[] | null {
        const queue: Node[] = [start];
        const visited: Set<Node> = new Set();
        const parent: Map<Node, Node> = new Map();

        visited.add(start);

        while (queue.length > 0) {
            const node = queue.shift()!;
            if (node.coord.x === end.coord.x && node.coord.y === end.coord.y) {
                return this.constructPath(parent, start, end);
            }

            for (const neighbour of this.adjacencyList.get(node) || []) {
                if (!visited.has(neighbour) && !neighbour.occupied) {
                    visited.add(neighbour);
                    parent.set(neighbour, node);
                    queue.push(neighbour);
                }
            }
        }

        return null;
    }

    constructPath(parents: Map<Node, Node>, start: Node, end: Node): Coordinate[] {
        const path: Coordinate[] = [end.coord];

        let node = end;
        while (!(node.coord.x === start.coord.x && node.coord.y === start.coord.y)) {
            node = parents.get(node)!;
            path.unshift(node.coord);
        }

        return path;
    }
}