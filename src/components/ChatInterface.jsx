import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Plus,
  Send,
  ArrowLeft,
  X,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
} from "lucide-react";
import { useNodes } from "../context/NodesContext";
import { callOpenAI } from "../services/llmService";
import { callTogetherAI } from "../services/togetherAIService";

export default function ChatInterface() {
  const {
    setIsDeployed,
    outputResponse,
    apiProvider,
    apiKey,
    model,
    maxTokens,
    temperature,
  } = useNodes();

  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentChatId, setCurrentChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [showUndeployModal, setShowUndeployModal] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load conversations from localStorage on initial render
    const storedConversations = localStorage.getItem("conversations");
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }

    // Create a new conversation if none exists
    if (!currentChatId) {
      const newChatId = "chat_" + Date.now();
      const newChat = {
        id: newChatId,
        title: "New Conversation",
        createdAt: new Date().toISOString(),
      };

      setCurrentChatId(newChatId);
      setConversations((prev) => {
        const updated = [...prev, newChat];
        localStorage.setItem("conversations", JSON.stringify(updated));
        return updated;
      });

      // Initialize with welcome message from the AI
      setMessages([
        {
          role: "assistant",
          content: "Hello! How can I help you today?",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      localStorage.setItem(
        `messages_${currentChatId}`,
        JSON.stringify(messages)
      );
    }
  }, [currentChatId, messages]);

  // Load messages when switching chats
  useEffect(() => {
    if (currentChatId) {
      const storedMessages = localStorage.getItem(`messages_${currentChatId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([
          {
            role: "assistant",
            content: "Hello! How can I help you today?",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    }
  }, [currentChatId]);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleUndeploy = () => {
    setShowUndeployModal(true);
  };

  const confirmUndeploy = () => {
    setIsDeployed(false);
    setShowUndeployModal(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // Add user message
    const userMessage = {
      role: "user",
      content: messageInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageInput("");
    setIsLoadingResponse(true);

    try {
      // Use the outputResponse for the first message, then call the AI API directly for subsequent messages
      let responseContent;

      if (messages.length <= 1 && outputResponse) {
        // Use the pre-computed output from the node system
        responseContent = outputResponse;
      } else {
        // Call the AI API directly
        if (apiProvider === "openai") {
          responseContent = await callOpenAI(
            messageInput,
            apiKey,
            model,
            maxTokens,
            temperature
          );
        } else {
          responseContent = await callTogetherAI(
            messageInput,
            apiKey,
            model,
            maxTokens,
            temperature
          );
        }
      }

      const aiResponse = {
        role: "assistant",
        content:
          responseContent ||
          "I'm sorry, I couldn't process your request. Please try again.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiResponse]);

      // Update the chat title based on the first user message
      if (messages.length <= 1) {
        const truncatedTitle =
          messageInput.slice(0, 25) + (messageInput.length > 25 ? "..." : "");

        setConversations((prev) => {
          const updated = prev.map((chat) =>
            chat.id === currentChatId
              ? { ...chat, title: truncatedTitle }
              : chat
          );
          localStorage.setItem("conversations", JSON.stringify(updated));
          return updated;
        });
      }
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add error message
      const errorResponse = {
        role: "assistant",
        content:
          "I'm sorry, there was an error processing your request. Please try again later.",
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const startNewChat = () => {
    const newChatId = "chat_" + Date.now();
    const newChat = {
      id: newChatId,
      title: "New Conversation",
      createdAt: new Date().toISOString(),
    };

    setCurrentChatId(newChatId);
    setMessages([
      {
        role: "assistant",
        content: "Hello! How can I help you today?",
        timestamp: new Date().toISOString(),
      },
    ]);

    setConversations((prev) => {
      const updated = [...prev, newChat];
      localStorage.setItem("conversations", JSON.stringify(updated));
      return updated;
    });
  };

  const switchToChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 border-r flex flex-col bg-white shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">OpenAGI Chat</span>
          </div>

          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Start new chat
          </button>
        </div>

        <div className="px-3 py-4 flex-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">
            Chat History
          </div>
          <div className="space-y-1">
            {conversations
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => switchToChat(chat.id)}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded-xl transition-colors ${
                    currentChatId === chat.id
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  } flex items-center gap-3`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
          </div>
        </div>

        {/* Undeploy button at the bottom of sidebar */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={handleUndeploy}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Canvas
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="border-b px-6 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">AI Assistant</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-green-50 text-green-600 text-sm font-medium rounded-full">
              Active
            </div>
          </div>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <h1 className="text-2xl font-semibold mb-4">
                Ask the AI Assistant Anything
              </h1>
              <p className="text-gray-600 max-w-md">
                Ask me anything, and I'll do my best to provide you with
                accurate and helpful information, whether you're looking for
                answers, guidance, or just curious about the world around you.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } gap-4`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="flex flex-col gap-2 max-w-2xl">
                  <div
                    className={`p-4 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white ml-auto"
                        : msg.isError
                        ? "bg-red-50 text-red-700"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === "assistant" && !msg.isError && (
                    <div className="flex gap-2">
                      <button
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => copyToClipboard(msg.content)}
                      >
                        <Copy className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <ThumbsUp className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <ThumbsDown className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <RotateCcw className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">U</span>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Loading message */}
          {isLoadingResponse && (
            <div className="flex justify-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-gray-100 text-gray-800">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "100ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "200ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t p-6 bg-white">
          <form
            onSubmit={handleSendMessage}
            className="max-w-3xl mx-auto flex gap-3"
          >
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoadingResponse}
            />
            <button
              type="submit"
              disabled={!messageInput.trim() || isLoadingResponse}
              className="px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Custom Undeploy Confirmation Modal */}
      {showUndeployModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[400px] p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Confirm Action</h3>
              <button
                onClick={() => setShowUndeployModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to return to the canvas? This will stop the
              current session.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUndeployModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmUndeploy}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Return to Canvas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
