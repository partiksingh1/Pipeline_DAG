import { useState } from "react";

interface NavbarProps {
    onAddNode: (label: string) => void;
    onAutoLayout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddNode, onAutoLayout }) => {
    const [isInputVisible, setInputVisible] = useState(false);
    const [nodeLabel, setNodeLabel] = useState('');
    const handleAddNodeClick = () => {
        setInputVisible(true); // Show the input when "Add Node" is clicked
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNodeLabel(event.target.value);
    };
    const handleSubmitNodeLabel = () => {
        if (nodeLabel.trim() !== '') {
            onAddNode(nodeLabel); // Call the parent callback with the entered label
            setNodeLabel(''); // Reset the input field
            setInputVisible(false); // Hide the input after submitting
        }
    };
    return (
        <div className="flex justify-between m-4">
            <div className="">
                <h1 className="text-4xl">DAG Pipeline</h1>
            </div>
            <div className="flex gap-2">
                <button onClick={handleAddNodeClick} className="px-4 py-2 bg-black text-white rounded cursor-pointer">Add Node</button>
                {/* Conditionally show input */}
                {isInputVisible && (
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={nodeLabel}
                            onChange={handleInputChange}
                            className="px-4 py-2 border rounded"
                            placeholder="Enter node name"
                        />
                        <button
                            onClick={handleSubmitNodeLabel}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Submit
                        </button>
                    </div>
                )}
                <button onClick={onAutoLayout} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Auto Layout</button>
            </div>
        </div>
    )
}