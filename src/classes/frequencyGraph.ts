import { MINIMUM_FREQUENCY } from "../data/frequencyData";
import { Neurons } from "../data/neuronData";
import { Coordinate } from "../utils/types";

class Node {
    type: Neurons;
    id: string;
    frequency: number = MINIMUM_FREQUENCY;
    incoming: Node[] = [];
    outgoing: Node[] = [];

    constructor(type: Neurons, coord: Coordinate) {
        this.type = type;
        this.id = `${coord.x}_${coord.y}`;
    }
}

export class FrequencyGraph {
    nodes: Map<string, Node> = new Map();

    addNode(type: Neurons, coord: Coordinate) {
        if (this.nodes.has(this.idToCoord(coord))) return;

        this.nodes.set(this.idToCoord(coord), new Node(type, coord));
    }

    addEdge(sender: Node, receiver: Node) {
        sender.outgoing.push(receiver);
        receiver.incoming.push(sender);
    }

    removeNode(id: string) {
        if (!this.nodes.has(id)) return;

        this.nodes.get(id)!.outgoing.forEach(receiver => {
            receiver.incoming = receiver.incoming.filter(n => n)
        });
    }

    private idToCoord(coord: Coordinate): string {
        return `${coord.x}_${coord.y}`;
    }
}