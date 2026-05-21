"use client";

import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Ask me anything about the website!", bot: true },
  ]);
  const [input, setInput] = useState("");

  // 🔥 SMART WEBSITE RESPONSE FUNCTION
  const getBotResponse = (msg: string) => {
    const text = msg.toLowerCase();

    if (text.includes("login")) {
      return "You can find the Login button at the top-right corner of the website.";
    }

    if (text.includes("course")) {
      return "Go to 'All Courses' in the navbar to explore all available courses.";
    }

    if (text.includes("contact")) {
      return "You can find Contact details in the 'Contact' section in the navbar.";
    }

    if (text.includes("enroll")) {
      return "Open any course and click on 'Enroll Now' button.";
    }

    if (text.includes("price")) {
      return "Each course page shows pricing in the Purchase section.";
    }

    return "Sorry, I didn't understand that. Try asking about courses, login, or contact.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = input;
    const botReply = getBotResponse(userMsg);

    setMessages([
      ...messages,
      { text: userMsg, bot: false },
      { text: botReply, bot: true },
    ]);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-500 p-4 rounded-full shadow-lg"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-[420px] bg-black border border-white/10 rounded-2xl flex flex-col z-50">

          <div className="p-4 border-b border-white/10">
            <h3 className="font-semibold">Website Assistant</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.bot
                    ? "bg-white/10"
                    : "bg-blue-500 ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 bg-white/10 rounded-lg outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 px-4 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}