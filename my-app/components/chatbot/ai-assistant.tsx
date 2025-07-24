"use client"

import type React from "react"
import axios from 'axios';
import { useState } from "react"
import { Sparkles, Minus, Maximize2, X } from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface AIAssistantProps {
  // Customization options
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  theme?: "light" | "dark" | "auto"
  initialMessage?: string
  disabled?: boolean
  className?: string
  // Callbacks
  onMessageSent?: (message: string) => void
  onChatToggle?: (isOpen: boolean) => void
  // Custom styling
  primaryColor?: string
  accentColor?: string
}

export default function AIAssistant({
  position = "bottom-right",
  theme = "light",
  initialMessage = "Hi! I'm Alris, your AI assistant. How can I help you today?",
  disabled = false,
  className = "",
  onMessageSent,
  onChatToggle,
  primaryColor = "from-blue-600 to-purple-600",
  accentColor = "from-blue-700 to-purple-700",
}: AIAssistantProps) {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMaximized, setChatMaximized] = useState(false)
  const [chatMinimized, setChatMinimized] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: initialMessage,
      isUser: false,
      timestamp: new Date(),
    },
  ])

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  }
  

  // Theme classes
  const themeClasses = {
    light: {
      bg: "bg-white",
      border: "border-gray-200",
      text: "text-gray-900",
      textSecondary: "text-gray-600",
      input: "border-gray-300 focus:ring-blue-500",
      messageBg: "bg-gray-100",
      headerBg: "bg-gradient-to-r from-blue-50 to-purple-50",
    },
    dark: {
      bg: "bg-gray-800",
      border: "border-gray-600",
      text: "text-white",
      textSecondary: "text-gray-300",
      input: "border-gray-600 focus:ring-blue-400 bg-gray-700 text-white",
      messageBg: "bg-gray-700",
      headerBg: "bg-gradient-to-r from-gray-700 to-gray-600",
    },
    auto: {
      bg: "bg-white dark:bg-gray-800",
      border: "border-gray-200 dark:border-gray-600",
      text: "text-gray-900 dark:text-white",
      textSecondary: "text-gray-600 dark:text-gray-300",
      input:
        "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:text-white",
      messageBg: "bg-gray-100 dark:bg-gray-700",
      headerBg: "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600",
    },
  }

  const currentTheme = themeClasses[theme]

  const handleToggleChat = () => {
    const newState = !chatOpen
    setChatOpen(newState)
    setChatMinimized(false)
    onChatToggle?.(newState)
  }

const handleSendMessage = async () => {
  if (!inputValue.trim()) return;

  const newMessage: Message = {
    id: Date.now().toString(),
    content: inputValue,
    isUser: true,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, newMessage]);
  onMessageSent?.(inputValue);
  setInputValue('');

  try {
    const res = await axios.post("http://localhost:8000/chat/ask", {
      query: inputValue,
    });

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: res.data.response,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
        const errorResponse: Message = {
        id: (Date.now() + 2).toString(),
        content: `Sorry, an error occurred while processing your request. ${err instanceof Error ? err.message : ''}`,
        isUser: false,
        timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorResponse]);
    }
};


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (disabled) return null
  
  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {/* Chat Interface */}
      {chatOpen && !chatMinimized && (
        <div
          className={`mb-4 ${currentTheme.bg} rounded-lg shadow-2xl ${currentTheme.border} border transition-all duration-300 ${
            chatMaximized ? "fixed inset-4 w-auto h-auto" : "w-80 h-96"
          }`}
        >
          {/* Chat Header */}
          <div
            className={`flex items-center justify-between p-4 border-b ${currentTheme.border} ${currentTheme.headerBg}`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 bg-gradient-to-r ${primaryColor} rounded-full flex items-center justify-center`}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${currentTheme.text}`}>Alris Assistant</h3>
                <p className={`text-xs ${currentTheme.textSecondary}`}>Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChatMinimized(true)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                aria-label="Minimize chat"
              >
                <Minus className={`w-4 h-4 ${currentTheme.textSecondary}`} />
              </button>
              <button
                onClick={() => setChatMaximized(!chatMaximized)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                aria-label={chatMaximized ? "Restore chat" : "Maximize chat"}
              >
                <Maximize2 className={`w-4 h-4 ${currentTheme.textSecondary}`} />
              </button>
              <button
                onClick={() => {
                  setChatOpen(false)
                  setChatMaximized(false)
                  setChatMinimized(false)
                  onChatToggle?.(false)
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                aria-label="Close chat"
              >
                <X className={`w-4 h-4 ${currentTheme.textSecondary}`} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-64">
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start space-x-2 ${message.isUser ? "justify-end" : ""}`}>
                  {!message.isUser && (
                    <div
                      className={`w-6 h-6 bg-gradient-to-r ${primaryColor} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-xs ${
                      message.isUser
                        ? `bg-gradient-to-r ${primaryColor} text-white`
                        : `${currentTheme.messageBg} ${currentTheme.text}`
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.isUser && (
                    <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-600 dark:text-gray-300">You</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className={`border-t ${currentTheme.border} p-4`}>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-3 py-2 border ${currentTheme.input} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm`}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`bg-gradient-to-r ${primaryColor} hover:bg-gradient-to-r hover:${accentColor} text-white p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label="Send message"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Chat Bar */}
      {chatOpen && chatMinimized && (
        <div className={`mb-4 ${currentTheme.bg} rounded-lg shadow-lg ${currentTheme.border} border p-3 w-64`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 bg-gradient-to-r ${primaryColor} rounded-full flex items-center justify-center`}>
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className={`text-sm font-medium ${currentTheme.text}`}>Alris Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChatMinimized(false)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                aria-label="Restore chat"
              >
                <Maximize2 className={`w-4 h-4 ${currentTheme.textSecondary}`} />
              </button>
              <button
                onClick={() => {
                  setChatOpen(false)
                  setChatMinimized(false)
                  onChatToggle?.(false)
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                aria-label="Close chat"
              >
                <X className={`w-4 h-4 ${currentTheme.textSecondary}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleToggleChat}
        className={`w-14 h-14 bg-gradient-to-r ${primaryColor} hover:bg-gradient-to-r hover:${accentColor} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          chatOpen ? "scale-90" : "hover:scale-110"
        }`}
        aria-label={chatOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        <Sparkles className={`transition-all duration-300 ${chatOpen ? "w-5 h-5" : "w-6 h-6 group-hover:rotate-12"}`} />
      </button>
    </div>
  )
}
