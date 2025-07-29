import dagre from '@dagrejs/dagre';
import type { Edge, Node } from '@xyflow/react';

const nodeWidth = 180;
const nodeHeight = 100;

export const AutoLayout = (nodes: Node[], edges: Edge[]) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({
        rankdir: 'LR', // Top to bottom layout
        nodesep: 30,
        ranksep: 50,
        marginx: 20,
        marginy: 20,
    });

    // Add nodes to dagre graph
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    // Add edges to dagre graph
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // Run dagre layout algorithm
    dagre.layout(dagreGraph);

    // Map over nodes to apply layout positions
    const layoutNodes = nodes.map((node) => {
        const pos = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: pos.x - nodeWidth / 2, // Center the node in the layout
                y: pos.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: layoutNodes, edges };
};
