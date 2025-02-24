import { Plus, Minus, Maximize2,  Unlock } from 'lucide-react';
import { LuSquareMousePointer } from "react-icons/lu";

const DragDropBackground = () => {
  return (
    <div className="relative w-full h-screen bg-gray-50 ">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full">
        <div className="text-center">
          <div className="w-12 h-12 mb-4 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <LuSquareMousePointer className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-gray-600">Drag & drop to get started</p>
        </div>
      </div>

      {/* Bottom left vertical icons */}
      <div
        className="absolute flex flex-col gap-2"
        style={{
          left: '329.57px',
          top: '565.18px',
          height: '112.42px'
        }}
      >
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Maximize2 className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          < Unlock className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default DragDropBackground;
