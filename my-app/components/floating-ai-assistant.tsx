import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Sparkles, X, Minus, Maximize2, Minimize2, Send } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
}

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m your AI assistant. What insights can I offer you?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      message: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        message: 'I understand your question. Let me analyze the dashboard data and provide you with insights about the cybersecurity metrics.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const minimize = () => {
    setIsOpen(false);
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Icon */}
      {!isOpen && (
        <div 
          className="fixed bottom-6 right-6 z-50 cursor-pointer group"
          onClick={toggleOpen}
        >
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {/* Pulsing animation */}
            <div className="absolute inset-0 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl border transition-all duration-300 ${
            isMaximized 
              ? 'w-screen h-screen top-0 left-0 right-0 bottom-0 rounded-none' 
              : 'w-96 h-[500px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <p className="text-white/80 text-xs">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={minimize}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Minimize"
              >
                <Minus className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={toggleMaximize}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? (
                  <Minimize2 className="w-4 h-4 text-white" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isMaximized ? 'h-[calc(100vh-140px)]' : 'h-[350px]'}`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700"
                aria-label="Message input"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className="p-2 bg-blue-500 text-black rounded-full hover:bg-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIAssistant;