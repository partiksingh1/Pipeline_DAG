
import { Handle, Position } from '@xyflow/react'
interface CustomNodeData {
    label: string;
}

// Define the props for the CustomNode component
interface CustomNodeProps {
    data: CustomNodeData;
    selected: boolean;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, selected }) => {
    return (
        <div className={`custom-node ${selected ? 'selected' : ''}`}>
            <Handle type="target" position={Position.Left} style={{ background: '#3b82f6' }} />
            <div className="custom-node-content">
                {data.label}
            </div>
            <Handle type="source" position={Position.Right} style={{ background: '#3b82f6' }} />
        </div>
    )
}

export default CustomNode