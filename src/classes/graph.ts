import { Coordinate, Direction } from "../utils/types";

type Node = Coordinate & { id: string };

export type Occupant = "Neuron" | "Axon";

export class Graph {
    rows: number;
    cols: number;
    adjacencyList: Map<string, Node[]>;
    occupied: Map<string, Occupant>;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.adjacencyList = new Map();
        this.occupied = new Map();
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

    setOccupancy(coord: Coordinate, occupant: Occupant) {
        const id = this.createNodeId(coord);
        if (!this.adjacencyList.has(id)) return;
        this.occupied.set(id, occupant);
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

    bfs(start: Coordinate, end: Coordinate, initialDir: Direction): Coordinate[] | null {
        const startNode: Node = this.createNodeFromCoord(start);
        const endNode: Node = this.createNodeFromCoord(end);
        const visited: Set<string> = new Set();
        const parent: Map<string, { node: Node, direction: Direction }> = new Map();
        const queue: { node: Node, direction: Direction }[] = [{node: startNode, direction: initialDir}];

        visited.add(startNode.id);

        while (queue.length > 0) {
            const { node, direction } = queue.shift()!;
            if (node.id === endNode.id) {
                return this.constructPath(parent, startNode, endNode);
            }

            for (const neighbour of this.adjacencyList.get(node.id) || []) {
                const neighbourDir = this.getDirection(node, neighbour);
                if (!visited.has(neighbour.id)) {
                    visited.add(neighbour.id);
                    parent.set(neighbour.id, { node, direction: neighbourDir });
                    
                    if (neighbourDir === direction) {
                        queue.unshift({node: neighbour, direction: neighbourDir}); // Priority given to similar direction
                    } else {
                        queue.push({node: neighbour, direction: neighbourDir});
                    }
                }
            }
        }

        return null;
    }

    constructPath(parents: Map<string, { node: Node, direction: Direction }>, start: Node, end: Node): Coordinate[] {
        const path: Coordinate[] = [end];
        console.log('cons');
        let nodeId = end.id;
        while (nodeId !== start.id) {
            const { node } = parents.get(nodeId)!;
            path.unshift(node);
            nodeId = node.id;
        }
        console.log('doen consruct');
        return path;
    }

    getDirection(from: Node, to: Node): Direction {
        if (to.x < from.x) return Direction.UP;
        if (to.x > from.x) return Direction.DOWN;
        if (to.y < from.y) return Direction.LEFT;
        if (to.y > from.y) return Direction.RIGHT;
        throw new Error('getDirection non-adjacent');
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