
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, MiniMap, ReactFlow, type Connection, type Edge, type Node } from '@xyflow/react';
import { Navbar } from './components/NavBar';
import { useCallback, useEffect, useRef, useState } from 'react';
import CustomNode from './components/CustomNode';

function App() {

  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  const [errors, setErrors] = useState<string[]>([]);
  const [valid, setIsValid] = useState(true);
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
  const checkDAGValidity = () => {
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


    // If there are validation errors, set them and set valid to false
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsValid(false);
    } else {
      // No errors found, valid DAG
      setErrors([]);
      setIsValid(true);
    }
  };
  useEffect(() => {
    checkDAGValidity();
  }, [nodes, edges]);
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
  const renderDAGStatus = () => {
    if (errors.length > 0) {
      return (
        <div className="m-4 w-fit p-4 bg-red-100 border border-red-500 rounded">
          <h3 className="text-red-600 text-xl font-semibold">Invalid DAG</h3>
          <ul className="list-disc pl-5 text-red-600">
            {errors.map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (valid) {
      return (
        <div className="m-4 w-fit p-4 bg-green-100 border border-green-500 rounded">
          <h3 className="text-green-600 text-xl font-semibold">Valid DAG</h3>
          <p className="text-sm">Your pipeline is valid and ready for execution!</p>
        </div>
      );
    } else {
      return null;
    }
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
      <div className='flex justify-between gap-4'>
        {renderDAGStatus()}
      </div>
    </div>
  )
}

export default App
