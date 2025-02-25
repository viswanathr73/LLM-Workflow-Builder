import { useNodes } from "../../context/NodesContext";
import { Handle, Position } from "reactflow";

export default function LLMNode({ data }) {
  const { 
    apiProvider, setApiProvider,
    model, setModel, 
    apiKey, setApiKey, 
    maxTokens, setMaxTokens, 
    temperature, setTemperature 
  } = useNodes();
  
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
        {/* API Provider Selection */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500">API Provider</label>
          <select
            value={apiProvider}
            onChange={(e) => setApiProvider(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
          >
            <option value="together">Together AI (LLaMA)</option>
            <option value="openai">OpenAI</option>
          </select>
        </div>
        
        {/* Model Selection */}
       <div className="space-y-1">
    <label className="text-xs text-gray-500">Model Name</label>
    <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
    >
        {apiProvider === 'openai' ? (
            <>
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                <option value="gpt-4">gpt-4</option>
            </>
        ) : (
            <>
                <option value="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free">Llama-3.3-70B-Instruct-Turbo-Free</option>
                <option value="meta-llama/Llama-Vision-Free">Llama-Vision-Free</option>
                <option value="deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free">DeepSeek-R1-Distill-Llama-70B-free</option>
            </>
        )}
    </select>
</div>
        
        {/* API Base URL (only for Together AI) */}
        {apiProvider === 'together' && (
          <div className="space-y-1">
            <label className="text-xs text-gray-500">API Base URL</label>
            <input
              type="text"
              value="https://api.together.xyz/v1/completions"
              disabled
              className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm bg-gray-50"
            />
          </div>
        )}
        
        {/* API Key */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500">{apiProvider === 'openai' ? 'OpenAI Key' : 'Together AI Key'}</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={`Enter your ${apiProvider === 'openai' ? 'OpenAI' : 'Together AI'} API key`}
            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>
        
        {/* Token and Temperature Controls - Both as input fields */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Max Tokens</label>
          <input
            type="number"
            value={maxTokens}
            onChange={(e) => setMaxTokens(Number(e.target.value))}
            min="1"
            step="1"
            placeholder="2000"
            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Temperature</label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => {
              // Ensure value is between 0 and 1
              const newValue = Math.max(0, Math.min(1, parseFloat(e.target.value) || 0));
              // Round to nearest 0.1
              const roundedValue = Math.round(newValue * 10) / 10;
              setTemperature(roundedValue);
            }}
            min="0"
            max="1"
            step="0.1"
            placeholder="0.7"
            className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="p-2 border-t border-gray-200 flex justify-between items-center">
        {/* Input connection handle */}
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
        
        {/* Output connection handle */}
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