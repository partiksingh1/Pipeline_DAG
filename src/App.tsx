
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, MiniMap, ReactFlow, type Connection, type Edge, type Node } from '@xyflow/react';
import { Navbar } from './components/NavBar';
import { useCallback, useRef, useState } from 'react';
import CustomNode from './components/CustomNode';

function App() {

  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  const [errors, setErrors] = useState<string[]>([]);
  const nodeTypes = {
    selectorNode: CustomNode,
  };
  const nodeIdRef = useRef(0);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  // Logic to handle the node addition

  const handleAddNode = (label: string) => {
    const newNode: Node = {
      id: `n${nodeIdRef.current}`,
      type: 'selectorNode',
      position: {
        x: Math.random() * 400,
        y: Math.random() * 200,
      },
      data: {
        label,
      },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    nodeIdRef.current += 1;
    setErrors([]); // Reset errors after adding a node
  };

  const validateEdge = (params: Connection): string[] => {
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
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const newErrors = validateEdge(params);

      if (newErrors.length > 0) {
        setErrors(newErrors); // Show errors if there are any
      } else {
        setErrors([]); // Clear errors
        setEdges((eds) => addEdge(params, eds)); // Add the edge if no errors
      }
    },
    [nodes],
  );

  const handleAutoLayout = () => {
    // Implement auto layout logic here
  };
  return (
    <div className="h-screen w-screen">
      <Navbar onAddNode={handleAddNode} onAutoLayout={handleAutoLayout} />
      <div className="h-3/4 border-2 bg-gray-300 m-2">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap nodeStrokeWidth={3} />
          <Background color="#ccc" variant={BackgroundVariant.Lines} />
        </ReactFlow>
      </div>
    </div>
  )
}

export default App
