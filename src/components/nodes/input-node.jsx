export default function InputNode() {
    return (
      <div className="w-[300px] rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-3">
          <h3 className="text-sm font-medium">INPUT</h3>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Write the input question you want to ask
            </label>
            <input
              type="text"
              placeholder="Type Something..."
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    )
  }