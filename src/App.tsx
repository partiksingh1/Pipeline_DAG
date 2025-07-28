
import { Navbar } from './components/NavBar';

function App() {

  // Logic to handle the node addition
  const handleAddNode = (label: string) => {

  };

  const handleAutoLayout = () => {
    // Implement auto layout logic here
  };
  return (
    <div className="h-screen w-screen">
      <Navbar onAddNode={handleAddNode} onAutoLayout={handleAutoLayout} />
    </div>
  )
}

export default App
