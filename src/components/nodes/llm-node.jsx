import { useNodes } from "../../context/NodesContext";
import { Handle, Position } from "reactflow";

export default function LLMNode({ data }) {
  const { model, setModel, apiKey, setApiKey, maxTokens, setMaxTokens, temperature, setTemperature } = useNodes();
  const isConnected = data?.isConnected || false;

  return (
    <div className="w-[300px] rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">
            <span>◆</span>
          </div>
          <h3 className="text-sm font-medium">LLM ENGINE</h3>
        </div>
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Model Name</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
          >
            <option value="gpt-3.5">gpt-3.5</option>
            <option value="gpt-4">gpt-4</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-500">OpenAI API Base</label>
          <input
            type="text"
            placeholder="https://openai.base.link"
            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-500">OpenAI Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Type something..."
            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Max Tokens</label>
          <input
            type="number"
            value={maxTokens}
            onChange={(e) => setMaxTokens(Number(e.target.value))}
            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Temperature</label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-xs">{temperature}</span>
          </div>
        </div>
      </div>
      <div className="p-2 border-t border-gray-200 flex justify-between items-center">
        {/* Input connection label and handle on bottom left */}
        <div className="flex items-center">
          <div className="text-xs text-gray-400 mr-1">Input</div>
          <div className="relative">
            <Handle
              type="target"
              position={Position.Bottom}
              id="llm-in"
              style={{ 
                background: '#9333ea', 
                width: '8px', 
                height: '8px',
                bottom: '-4px',
                left: '0',
              }}
            />
          </div>
        </div>
        
        {/* Output connection label and handle on bottom right */}
        <div className="flex items-center">
          <div className="text-xs text-gray-400 mr-1">Output</div>
          <div className="relative">
            <Handle
              type="source"
              position={Position.Bottom}
              id="llm-out"
              style={{ 
                background: '#9333ea', 
                width: '8px', 
                height: '8px',
                bottom: '-4px',
                right: '0',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}