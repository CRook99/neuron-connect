import { MINIMUM_FREQUENCY } from "../data/frequencyData";
import { Neurons } from "../data/neuronData";
import { Coordinate } from "../utils/types";
import { ACTIVATION_THRESHOLD, MAXIMUM_FREQUENCY, SATURATION_THRESHOLD, SLOPE, TONIC_FREQUENCY } from "../data/frequencyData";

class Node {
    type: Neurons;
    id: string;
    frequency: number = MINIMUM_FREQUENCY;
    frequencyBuffer: number = 0; // Holds new frequency until all nodes have calculated new frequencies
    incoming: Node[] = [];
    outgoing: Node[] = [];
    history: number[] = [];

    constructor(type: Neurons, coord: Coordinate) {
        this.type = type;
        this.id = `${coord.x}_${coord.y}`;
    }

    calculateNewFrequency() {
        const totalInput = this.incoming.reduce((sum, current) => sum + (current.frequency * (current.type === Neurons.Excitatory ? 1 : -1 )), 0);

        let output;
        if (totalInput <= ACTIVATION_THRESHOLD) {
            output = TONIC_FREQUENCY;
        } else if (totalInput >= SATURATION_THRESHOLD) {
            output = MAXIMUM_FREQUENCY;
        } else {
            output = MINIMUM_FREQUENCY + ((SLOPE) * (totalInput - ACTIVATION_THRESHOLD));
        }
            
        this.frequencyBuffer = Number(output.toFixed(1));
    }

    // Not performed until all nodes have calculated with previous step frequencies
    loadNewFrequency() {
        this.frequency = this.frequencyBuffer;
    }
}

export class FrequencyGraph {
    nodes: Map<string, Node> = new Map();

    addNode(type: Neurons, coord: Coordinate) {
        if (this.nodes.has(this.coordToId(coord))) return;

        this.nodes.set(this.coordToId(coord), new Node(type, coord));
    }

    addEdge(startCoord: Coordinate, endCoord: Coordinate) {
        const startNode = this.nodes.get(this.coordToId(startCoord));
        const endNode = this.nodes.get(this.coordToId(endCoord));

        if (!startNode || !endNode)
            throw new Error(`Frequency graph cannot add edge between ${startCoord} and ${endCoord}`);

        startNode.outgoing.push(endNode);
        endNode.incoming.push(startNode);
    }

    removeNode(id: string) {
        if (!this.nodes.has(id)) return;

        this.nodes.get(id)!.outgoing.forEach(receiver => {
            receiver.incoming = receiver.incoming.filter(n => n)
        });
        this.nodes.delete(id);
    }

    queryGraphForFrequency(coord: Coordinate) {
        let id = this.coordToId(coord);
        if (!this.nodes.has(id)) {
            return -999;
        }

        return this.nodes.get(id)!.frequency;
    }

    generateNextStep() {
        this.nodes.forEach((node) => {
            node.calculateNewFrequency();
        })
        this.nodes.forEach((node) => {
            node.loadNewFrequency();
        })
    }

    storeStep(step: number) {
        this.nodes.forEach((node) => {
            node.history[step] = node.frequency;
        })
    }

    loadStep(step: number) {
        this.nodes.forEach((node) => {
            node.frequency = node.history[step];
        })
    }

    private coordToId(coord: Coordinate): string {
        return `${coord.x}_${coord.y}`;
    }
}