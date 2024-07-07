import { Coordinate } from "../utils/types";

type Node = Coordinate & { id: string };

export class Graph {
    rows: number;
    cols: number;
    adjacencyList: Map<string, Node[]>;
    occupied: Map<string, boolean>;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.adjacencyList = new Map();
        this.occupied = new Map();
        this.createGrid();
    }

    private createNodeFromCoord(coord: Coordinate): Node {
        return {x: coord.x, y: coord.y, id: this.createNodeId(coord.x, coord.y)}
    }

    private createNodeId(x: number, y: number): string {
        return `${x}_${y}`;
    }

    addNode(node: Node) {
        if (this.adjacencyList.has(node.id)) return;

        this.adjacencyList.set(node.id, []);
        this.occupied.set(node.id, false);
    }

    addEdge(a: Node, b: Node) {
        this.adjacencyList.get(a.id)?.push(b);
        this.adjacencyList.get(b.id)?.push(a);
    }

    createGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node: Node = { x: row, y: col, id: this.createNodeId(row, col) };
                this.addNode(node);

                if (col < this.cols - 1) {
                    const right: Node = { x: row, y: col + 1, id: this.createNodeId(row, col + 1)};
                    this.addNode(right);
                    this.addEdge(node, right);
                }

                if (row < this.rows - 1) {
                    const bottom: Node = { x: row + 1, y: col, id: this.createNodeId(row + 1, col)};
                    this.addNode(bottom);
                    this.addEdge(node, bottom);
                }
            }
        }
    }

    bfs(start: Coordinate, end: Coordinate): Coordinate[] | null {
        const startNode: Node = this.createNodeFromCoord(start);
        const endNode: Node = this.createNodeFromCoord(end);
        const visited: Set<string> = new Set();
        const parent: Map<string, Node> = new Map();
        const queue: Node[] = [startNode];

        visited.add(startNode.id);

        while (queue.length > 0) {
            const node = queue.shift()!;
            console.log(`Visiting ${node.x},${node.y}`);
            if (node.id === endNode.id) {
                return this.constructPath(parent, startNode, endNode);
            }


            for (const neighbour of this.adjacencyList.get(node.id) || []) {
                console.log(`Has neighbour ${node.x},${node.y}`);
                if (!visited.has(neighbour.id) && !this.occupied.get(neighbour.id)) {
                    visited.add(neighbour.id);
                    parent.set(neighbour.id, node);
                    queue.push(neighbour);
                }
            }
        }

        return null;
    }

    constructPath(parents: Map<string, Node>, start: Node, end: Node): Coordinate[] {
        const path: Coordinate[] = [end];

        let node = end;
        while (node.id !== start.id) {
            node = parents.get(node.id)!;
            path.unshift(node);
        }

        return path;
    }

    printGraph() {
        for (let [node, edges] of this.adjacencyList.entries()) {
            console.log(`${node} -> ${edges.map(n => `${n}`).join(', ')}`);
        }
    }

    getEntries() {
        return this.adjacencyList.entries();
    }
}