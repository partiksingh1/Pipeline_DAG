import type { Connection, Edge, Node } from "@xyflow/react";

export const validateEdge = (params: Connection, nodes: Node[]): string[] => {
    const errors: string[] = [];
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    if (!sourceNode || !targetNode) {
        return errors;
    }

    // Check edge direction: Outgoing -> Incoming (left -> right)
    if (sourceNode.position.x > targetNode.position.x) {
        errors.push("Edge must go from Left to right");
    }

    // Check self-loop
    if (params.source === params.target) {
        errors.push("Self-loop is not allowed");
    }

    return errors;
};
export const checkDAGValidity = (nodes: Node[], edges: Edge[]) => {
    const validationErrors: string[] = [];

    // Ensure at least 2 nodes
    if (nodes.length < 2) {
        validationErrors.push("DAG must have at least 2 nodes");
    }

    // Ensure all nodes are connected by at least one edge
    const allNodesConnected = nodes.every((node) =>
        edges.some((edge) => edge.source === node.id || edge.target === node.id)
    );
    if (!allNodesConnected) {
        validationErrors.push("All nodes must be connected to at least one edge");
    }

    // Helper: build adjacency list
    const adjacencyList: Record<string, string[]> = {};
    nodes.forEach((node) => {
        adjacencyList[node.id] = [];
    });
    edges.forEach((edge) => {
        if (adjacencyList[edge.source]) {
            adjacencyList[edge.source].push(edge.target);
        }
    });

    // Helper: DFS to detect cycle
    const visited = new Set<string>();
    const recStack = new Set<string>();
    let hasCycle = false;

    const dfs = (nodeId: string) => {
        if (recStack.has(nodeId)) {
            hasCycle = true;
            return;
        }
        if (visited.has(nodeId)) return;

        visited.add(nodeId);
        recStack.add(nodeId);

        for (const neighbor of adjacencyList[nodeId] || []) {
            dfs(neighbor);
        }

        recStack.delete(nodeId);
    };

    for (const node of nodes) {
        if (!visited.has(node.id)) {
            dfs(node.id);
            if (hasCycle) break;
        }
    }

    if (hasCycle) {
        validationErrors.push("Graph contains a cycle. DAGs cannot have cycles.");
    }

    // If there are validation errors, set them and set valid to false
    return { errors: validationErrors, valid: validationErrors.length === 0 };
};