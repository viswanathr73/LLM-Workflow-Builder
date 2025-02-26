import { useNodes } from "../../context/NodesContext";
import { Handle, Position } from "reactflow";

export default function OutputNode({ data }) {
  const { outputResponse } = useNodes();
  const isConnected = data?.isConnected || false;

  return (
    <div className="w-[300px] rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
            <span>◆</span>
          </div>
          <h3 className="text-sm font-medium">OUTPUT</h3>
        </div>
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-gray-400"
          }`}
        ></div>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Output Response</label>
          <textarea
            value={outputResponse}
            readOnly
            placeholder="Output Response will be shown here"
            className="min-h-[120px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="p-2 border-t border-gray-200 flex items-center">
        {/* Input connection label and handle on bottom left */}
        <div className="flex items-center">
          <div className="text-xs text-gray-400 mr-1">LLM Engine</div>
          <div className="relative">
            <Handle
              type="target"
              position={Position.Bottom}
              id="output-in"
              style={{
                background: "#16a34a",
                width: "8px",
                height: "8px",
                bottom: "-4px",
                left: "0",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
