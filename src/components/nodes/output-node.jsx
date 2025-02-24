export default function OutputNode() {
  return (
    <div className="w-[300px] rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-3">
        <h3 className="text-sm font-medium">OUTPUT</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Output Response</label>
          <textarea
            placeholder="Output response will be shown here"
            className="min-h-[100px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}