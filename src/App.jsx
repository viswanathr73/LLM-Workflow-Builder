import Header from './components/header';
import Sidebar from './components/sidebar';
import DragDropBackground from './components/DragDropBackground';
import InputNode from './components/nodes/input-node';


export default function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header Separate */}
      <div className="h-[63px] w-full">
        <Header />
      </div>

      {/* Main Layout with DragDropBackground covering the entire background */}
      <div className="flex-1 relative shadow-lg overflow-auto">
        {/* DragDropBackground as the Full Background */}
        <DragDropBackground />

        <div className="absolute inset-0 flex p-6 gap-6">
          {/* Sidebar Standing Separately */}
          <div className="w-[251px] h-[692px] bg-white shadow-lg rounded-2xl p-4 relative z-10">
            <Sidebar />
          </div>

          {/* Main Content - No White Background */}
          <main className="flex-1 relative z-10 p-6">
            {/* Placeholder for Nodes or Components */}
            <div className="flex h-full items-center justify-center">
              
            </div>

            {/* Placeholder for additional content */}
            <div className="hidden gap-8">
              <InputNode />
              {/* <LLMNode /> */}
              {/* <OutputNode /> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}