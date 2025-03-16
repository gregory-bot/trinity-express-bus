import { useState, useEffect, useRef } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false); 
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { text: newMessage, sender: 'user', timestamp: new Date() },
    ]);
    setNewMessage('');

    setIsBotTyping(true);
    setTimeout(() => {
      const routeResponses = {
        'nairobi to kigali': 'The route from Nairobi to Kigali costs KSh 7000 and takes approximately 12 hours.',
        'nairobi to kampala': 'The route from Nairobi to Kampala costs KSh 4000 and takes approximately 10 hours.',
        'nairobi to juba': 'The route from Nairobi to Juba costs KSh 9000 and takes approximately 15 hours.',
        'kigali to nairobi': 'The route from Kigali to Nairobi costs KSh 7200 and takes approximately 12 hours.',
        'kigali to kampala': 'The route from Kigali to Kampala costs KSh 3000 and takes approximately 8 hours.',
        'kampala to nairobi': 'The route from Kampala to Nairobi costs KSh 3800 and takes approximately 10 hours.',
        'kampala to juba': 'The route from Kampala to Juba costs KSh 4940 and takes approximately 14 hours.',
        'kampala to kigali': 'The route from Kampala to Kigali costs KSh 3800 and takes approximately 8 hours.',
      };

      const greetings = ['hello', 'hi', 'hey', 'mambo', 'sasa', 'niaje', 'vipi', 'habari', 'how are you', 'good afternoon', 'good morning', 'good evening', 'uko aje', 'greetings'];
      const thankYouPhrases = ['thank you', 'thanks', 'asante', 'shukran'];
      const routeKeywords = [
        'nairobi to kigali',
        'nairobi to kampala',
        'nairobi to juba',
        'kigali to nairobi',
        'kigali to kampala',
        'kampala to nairobi',
        'kampala to juba',
        'kampala to kigali',
      ];

      const routes = [
        { id: 1, name: "Nairobi to Kigali" },
        { id: 2, name: "Nairobi to Kampala" },
        { id: 3, name: "Nairobi to Juba" },
        { id: 4, name: "Kigali to Nairobi" },
        { id: 5, name: "Kigali to Kampala" },
        { id: 6, name: "Kampala to Nairobi" },
        { id: 7, name: "Kampala to Juba" },
        { id: 8, name: "Kampala to Kigali" },
      ];

      const userRequest = newMessage.trim().toLowerCase();
      let botResponse = '';
      const isGreeting = greetings.some((greeting) =>
        userRequest.includes(greeting)
      );
      const isThankYou = thankYouPhrases.some((phrase) =>
        userRequest.includes(phrase)
      );

      if (isGreeting) {
        botResponse = 'Hello😊 How can we assist you today?';
      } else if (isThankYou) {
        botResponse = 'karibu sana, our destined traveller!';
      } else {
        const matchedRoute = routeKeywords.find((keyword) =>
          userRequest.includes(keyword)
        );
        if (matchedRoute) {
          botResponse = routeResponses[matchedRoute];
        } else {
          botResponse =
            'I’m here to help😁, You can ask about our routes like how much is the price from "Nairobi to Kigali", "Nairobi to Kampala", or "Kampala to Juba". Or check our website for more options.';
        }
      }
      setMessages((prev) => [
        ...prev,
        { text: botResponse, sender: 'bot', timestamp: new Date() },
      ]);
      setIsBotTyping(false);
    }, 2000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Chat Widget */}
      <div
        className={`fixed bottom-24 right-6 w-72 sm:w-80 bg-white rounded-lg shadow-xl z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Talk to us 😊</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="h-72 sm:h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'user' ? 'bg-green-500 text-white' : 'bg-gray-100'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {/* Typing Indicator */}
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce delay-100"></div>
                  <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce delay-200"></div>
                  <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
          {/* Ref for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 min-w-0 border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}