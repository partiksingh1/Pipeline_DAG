
import { applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, MiniMap, ReactFlow, type Edge } from '@xyflow/react';
import { Navbar } from './components/NavBar';
import { useCallback } from 'react';

function App() {

  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  // Logic to handle the node addition
  const handleAddNode = (label: string) => {

  };

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const handleAutoLayout = () => {
    // Implement auto layout logic here
  };
  return (
    <div className="h-screen w-screen">
      <Navbar onAddNode={handleAddNode} onAutoLayout={handleAutoLayout} />
      <div className="h-3/4 border-2 bg-gray-300 m-2">
        <ReactFlow
          nodes={ }
          edges={ }
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#3b83e6',
            },
          }}
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
