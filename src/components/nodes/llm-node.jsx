import { useNodes } from "../../context/NodesContext";

export default function LLMNode() {
  const { model, setModel, apiKey, setApiKey, maxTokens, setMaxTokens, temperature, setTemperature } = useNodes();

  return (
    <div className="w-[300px] rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">
            <span>◆</span>
          </div>
          <h3 className="text-sm font-medium">LLM ENGINE</h3>
        </div>
        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
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
          <label className="text-xs text-gray-500">OpenAI API Key</label>
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
      <div className="p-2 flex justify-between">
        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center relative">
          <span className="absolute -left-2 text-xs">←</span>
        </div>
        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center relative">
          <span className="absolute -right-2 text-xs">→</span>
        </div>
      </div>
    </div>
  );
}