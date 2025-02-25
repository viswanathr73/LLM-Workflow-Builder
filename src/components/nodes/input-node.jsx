import { useNodes } from "../../context/NodesContext";
import { Handle, Position } from "reactflow";

export default function InputNode({ data }) {
  const { inputText, setInputText } = useNodes();
  const isConnected = data?.isConnected || false;
  const hasError = data?.hasError || false;

  return (
    <div className={`w-[300px] rounded-lg border ${hasError ? 'border-red-500' : 'border-gray-300'} bg-white shadow-sm ${hasError ? 'ring-2 ring-red-200' : ''}`}>
      <div className="border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
            <span>◆</span>
          </div>
          <h3 className="text-sm font-medium">INPUT</h3>
        </div>
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
      </div>
      <div className="p-4">
        <label className="text-xs text-gray-500 block mb-2">Write the input/ question you want to ask</label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type Something..."
          className={`w-full rounded-md border ${hasError ? 'border-red-300' : 'border-gray-200'} px-3 py-2 text-sm ${hasError ? 'focus:border-red-500' : 'focus:border-blue-500'} focus:outline-none`}
        />
        {hasError && (
          <p className="text-xs text-red-500 mt-1">Input is required</p>
        )}
      </div>
      <div className="p-2 flex justify-between items-center">
        <div className="text-xs text-gray-400 ml-50 ">LLM Engine</div>
        {/* Output handle - positioned inside the card on the right */}
        <div className="relative">
          <Handle
            type="source"
            position={Position.Right}
            id="input-out"
            style={{ 
              background: '#3b82f6', 
              width: '8px', 
              height: '8px', 
              right: '-4px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}