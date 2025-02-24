import { useNodes } from "../../context/NodesContext";

export default function OutputNode() {
  const { outputResponse } = useNodes();

  return (
    <div className="w-[300px] rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
            <span>◆</span>
          </div>
          <h3 className="text-sm font-medium">OUTPUT</h3>
        </div>
        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-500">Output Response</label>
          <textarea
            value={outputResponse}
            readOnly
            placeholder="Output response will be shown here"
            className="min-h-[120px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="p-2 flex justify-start">
        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center relative">
          <span className="absolute -left-2 text-xs">←</span>
        </div>
      </div>
    </div>
  );
}