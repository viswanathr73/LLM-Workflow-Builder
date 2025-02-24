export default function LLMNode() {
    return (
      <div className="w-[300px] rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-3">
          <h3 className="text-sm font-medium">LLM ENGINE</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Model Name</label>
            <select className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none">
              <option value="gpt-3.5">gpt-3.5</option>
              <option value="gpt-4">gpt-4</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">OpenAI API Key</label>
            <input
              type="password"
              placeholder="Type something..."
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Max Tokens</label>
            <input
              type="number"
              placeholder="Type something..."
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Temperature</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="0.5"
              className="w-full"
            />
          </div>
        </div>
      </div>
    )
  }