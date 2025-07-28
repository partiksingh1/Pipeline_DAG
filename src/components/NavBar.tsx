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
            onAddNode(nodeLabel);
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
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                        <div className="flex flex-col items-center gap-4 bg-white p-8 border rounded shadow-lg">
                            <h1 className="text-xl font-semibold">Create a Node</h1>
                            <input
                                type="text"
                                value={nodeLabel}
                                onChange={handleInputChange}
                                className="px-4 py-2 border rounded"
                                placeholder="Enter node name"
                            />
                            <div className="flex gap-4">
                                <button
                                    onClick={handleSubmitNodeLabel}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => {
                                        setInputVisible(false);
                                        setNodeLabel("");
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <button onClick={onAutoLayout} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">Auto Layout</button>
            </div>
        </div>
    )
}