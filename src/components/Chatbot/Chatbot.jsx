import React, { useState, useRef, useEffect } from "react";
import chatIcon from "./chat-icon.svg"; // ✅ using <img> for SVG

const API_URL = "/ai/ask";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I help you with our events today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      console.log("🔑 Sending token:", token);

      if (!token) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "⚠️ Authentication error. Please log in." },
        ]);
        setIsLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ FIXED
        },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "An error occurred.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "ai", text: data.answer }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: `❌ Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={`w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out mb-4 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 font-bold flex justify-between items-center rounded-t-2xl">
          <span>Event Assistant</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl hover:opacity-75"
          >
            &times;
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
          <div className="flex flex-col space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`py-2 px-4 rounded-xl max-w-[80%] break-words ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-xl rounded-bl-none py-2 px-4">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <form
          className="flex p-3 border-t border-gray-200"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-grow border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-600 text-white rounded-full w-10 h-10 ml-2 flex-shrink-0 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5 transform rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </form>
      </div>

      {/* Chat Icon */}
      <button
        className="bg-blue-600 text-white rounded-full w-16 h-16 flex justify-center items-center cursor-pointer shadow-lg transition-transform hover:scale-110"
        onClick={() => setIsOpen(true)}
      >
        <img src={chatIcon} className="w-8 h-8" alt="Chat" />
      </button>
    </div>
  );
};

export default Chatbot;
