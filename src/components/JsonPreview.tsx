import type { Edge, Node } from '@xyflow/react';
import React from 'react';

interface JsonPreviewProps {
    nodes: Node[];
    edges: Edge[];
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ nodes, edges }) => {
    // Extracting relevant data from nodes and edges to show in the preview
    const previewNodes = nodes.map((node) => ({
        id: node.id,
        label: node.data?.label,
        position: node.position,
    }));

    const previewEdges = edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
        type: edge.type,
    }));

    return (
        <div className="p-4 rounded-md shadow-lg w-3/4 mx-auto mt-4">
            <h2 className="text-xl font-semibold mb-4 text-center">JSON Preview</h2>
            <div className="space-y-4">
                <div className='border-2'>
                    <h3 className="text-lg font-medium underline">Nodes</h3>
                    <pre className="p-4 max-h-60 overflow-auto rounded-md">{JSON.stringify(previewNodes, null, 3)}</pre>
                </div>
                <div className='border-2'>
                    <h3 className="text-lg font-medium underline">Edges</h3>
                    <pre className="p-4 max-h-60 overflow-auto rounded-md">{JSON.stringify(previewEdges, null, 3)}</pre>
                </div>
            </div>
        </div>
    );
};

export default JsonPreview;
