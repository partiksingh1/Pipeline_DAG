# Directed Acyclic Graph (DAG) Implementation in React

## Overview

This project implements a Directed Acyclic Graph (DAG) using **React** and **ReactFlow**. The goal is to allow users to create a DAG structure dynamically by adding nodes, connecting them with edges, and ensuring the graph adheres to specific structural constraints. The graph is validated in real-time, with features like node addition, edge creation, and layout optimization.

## Features

- **DAG Structure**: Create and manage a Directed Acyclic Graph (DAG) with nodes and directed edges.
- **Node Management**: Dynamically add and manage nodes with custom labels and properties.
- **Edge Creation**: Manually create edges between nodes, enforcing left-to-right directionality.
- **Validation**: Ensure the DAG structure adheres to several constraints like the minimum number of nodes, no self-loops, and edge directionality.
- **Auto Layout**: Automatically organize the graph layout using the Dagre library.
- **JSON Preview**: View the DAG configuration in JSON format if the graph is valid.

## Requirements

- React
- ReactFlow
- Dagre (for auto layout)

## Setup

To get started with this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/partiksingh1/Pipeline_DAG
    cd Pipeline_DAG
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the project:
    ```bash
    npm start
    ```

4. Open the app in your browser at `http://localhost:5173`.

## Detailed Breakdown

### 1. **Understanding the Requirements and Structure**
The project is built around the concept of a **DAG**, a directed graph with no cycles, where each node can have multiple incoming and outgoing edges. Key requirements include:

- **At least two nodes must be present**.
- **Each node must be connected to at least one edge**.
- **Edges must be directed from left to right**.
- **Self-loops (edges pointing from a node to itself) are not allowed**.

### 2. **State Management**
React's `useState` and `useEffect` hooks manage the state:

- **Nodes State**: Holds nodes in the graph, each node contains properties like `id`, `position`, and `label`.
- **Edges State**: An array of edges, each with a source and target node ID.
- **Error State**: Tracks validation errors (e.g., self-loops, invalid edge directions).

### 3. **Node Addition and Management**
- Nodes are dynamically added with a unique identifier (generated via a counter).
- The node's position is randomized to avoid overlap.
- A custom `CustomNode` component is used to render each node with a label and properties.

### 4. **Edge Creation**
- Users can manually create edges by dragging from one node to another.
- **Edge Direction**: Enforced by checking the x-position of nodes (left to right).
- **Self-Loop Prevention**: Prevents edges from connecting a node to itself.

### 5. **Validation of the DAG Structure**
The validation process ensures the following:

- **At Least 2 Nodes**: A valid DAG requires at least two nodes.
- **Node Connectivity**: Every node must have at least one incoming or outgoing edge.
- **No Cycles**: A DAG cannot contain cycles (though full cycle-checking is not implemented here).
- **Edge Direction**: Edges must flow from left to right.
- **Self-Loop Prevention**: Prevents edges pointing back to the same node.

### 6. **DAG Status Display**
- **Valid DAG**: If the graph is valid, a success message is shown.
- **Invalid DAG**: If issues are detected (e.g., self-loops, unconnected nodes), an error message displays the issues.

### 7. **JSON Preview**
Once the DAG is validated, users can view the current configuration of the graph in JSON format. This preview is only accessible if the DAG is valid.

### 8. **AutoLayout Feature**
The AutoLayout feature uses the **Dagre** library to automatically arrange the nodes based on the graph structure. It ensures that nodes are arranged from left to right and prevents overlapping, making the graph visually clean and organized.

## Challenges and Solutions

### 1) **Custom Node Implementation**
- **Challenge**: Creating a custom node with specific styles and input/output connections.
- **Solution**: Built a `CustomNode` component in React with the `Handle` component from `@xyflow/react` to create source and target connectors. This allowed easy node connection while displaying labels for clarity.

### 2) **DAG Validation**
- **Challenge**: Ensuring the graph adheres to the structural constraints.
- **Solution**: Implemented a `checkDAGValidity` function that checks:
  - At least 2 nodes.
  - Node connectivity (each node must have at least one edge).
  - Edge direction (must go left to right).
  - Prevention of self-loops.

### 3) **Auto Layout Implementation**
- **Challenge**: Automatically organizing the nodes without overlap while maintaining left-to-right edge flow.
- **Solution**: Used the **Dagre** library to perform layout calculations, ensuring nodes are arranged in an organized manner without overlap.
