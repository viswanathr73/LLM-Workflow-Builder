import { NodesProvider } from "./context/NodesContext";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import DragDropBackground from "./components/DragDropBackground";

export default function App() {
  return (
    <NodesProvider>
      <div className="h-screen flex flex-col bg-gray-50 ">
        {/* Header */}
        <div className="h-[63px] w-full">
          <Header />
        </div>

        {/* Main Layout */}
        <div className="flex-1 relative shadow-lg overflow-auto flex">
          {/* Sidebar */}
          <div className="w-[251px] h-[calc(100vh-80px)] ml-4 mt-4 mb-4 bg-white shadow-lg rounded-2xl p-4 ">
            <Sidebar />
          </div>

          {/* Drag & Drop Canvas */}
          <div className="flex-1 relative">
            <DragDropBackground />
          </div>
        </div>
      </div>
    </NodesProvider>
  );
}
