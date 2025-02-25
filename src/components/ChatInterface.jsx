import { MessageCircle, Plus, Send } from "lucide-react"

export default function ChatInterface() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r flex flex-col">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">OpenAI</span>
          </div>

          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg border hover:bg-gray-50 transition-colors">
            <Plus className="w-4 h-4" />
            Start new chat
          </button>
        </div>

        <div className="px-2 py-2 flex-1 overflow-y-auto">
          <div className="text-xs uppercase text-gray-500 font-medium px-2 mb-2">Chat History</div>
          <div className="space-y-1">
            <button className="w-full text-left px-2 py-2 text-sm rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              New Conversation
            </button>
            <button className="w-full text-left px-2 py-2 text-sm rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              Create 10 prompts for a scenar...
            </button>
            <button className="w-full text-left px-2 py-2 text-sm rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              Generate a poem on dragons...
            </button>
            <button className="w-full text-left px-2 py-2 text-sm rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              Create 5 new poem...
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium">AI Assistant</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-semibold mb-4">Ask the AI Assistant Anything</h1>
          <p className="text-gray-600 max-w-md">
            Ask me anything, and I'll do my best to provide you with accurate and helpful information, whether you're
            looking for answers, guidance, or just curious about the world around you.
          </p>
        </div>

        <div className="border-t p-4">
          <div className="max-w-3xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Write your message"
              className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

