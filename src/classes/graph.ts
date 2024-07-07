import { Coordinate } from "../utils/types";

type Node = Coordinate & { id: string };

export class Graph {
    rows: number;
    cols: number;
    adjacencyList: Map<string, Node[]>;
    occupied: Set<string>;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.adjacencyList = new Map();
        this.occupied = new Set();
        this.createGrid();
    }

    private createNodeFromCoord(coord: Coordinate): Node {
        return {x: coord.x, y: coord.y, id: this.createNodeId(coord)}
    }

    private createNodeId(coord: Coordinate): string {
        return `${coord.x}_${coord.y}`;
    }

    addNode(node: Node) {
        if (this.adjacencyList.has(node.id)) return;

        this.adjacencyList.set(node.id, []);
    }

    addEdge(a: Node, b: Node) {
        this.adjacencyList.get(a.id)?.push(b);
        this.adjacencyList.get(b.id)?.push(a);
    }

    setOccupancy(coord: Coordinate) {
        const id = this.createNodeId(coord);
        if (!this.adjacencyList.has(id)) return;
        console.log(`Occupying ${coord.x}_${coord.y}`);
        this.occupied.add(id);
    }

    removeOccupancy(coord: Coordinate) {
        this.occupied.delete(this.createNodeId(coord)!);
    }

    createGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node: Node = { x: row, y: col, id: this.createNodeId({x: row, y: col}) };
                this.addNode(node);

                if (col < this.cols - 1) {
                    const right: Node = { x: row, y: col + 1, id: this.createNodeId({x: row, y: col + 1})};
                    this.addNode(right);
                    this.addEdge(node, right);
                }

                if (row < this.rows - 1) {
                    const bottom: Node = { x: row + 1, y: col, id: this.createNodeId({x: row + 1, y: col})};
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
            if (node.id === endNode.id) {
                return this.constructPath(parent, startNode, endNode);
            }


            for (const neighbour of this.adjacencyList.get(node.id) || []) {
                if (!visited.has(neighbour.id) && !this.occupied.has(neighbour.id)) {
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