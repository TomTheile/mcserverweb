
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare } from 'lucide-react';

const PublicChatDisplay = () => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = JSON.parse(localStorage.getItem('adminChatMessages') || '[]');
      setMessages(savedMessages);
    };

    loadMessages(); 

    const intervalId = setInterval(loadMessages, 5000); 

    const handleStorageChange = (event) => {
      if (event.key === 'adminChatMessages') {
        loadMessages();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className="py-12 bg-gray-850 minecraft-pattern-light">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="minecraft-header text-center mb-8"
        >
          <MessageSquare className="inline-block h-10 w-10 mr-2 text-green-400" />
          Server Chat & Announcements
        </motion.h2>
        <div className="max-w-3xl mx-auto bg-gray-900 bg-opacity-80 border-2 border-gray-700 rounded-lg p-6 shadow-xl">
          <div className="h-[400px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {messages.length === 0 && (
              <p className="text-gray-400 text-center py-10">No messages yet. Check back soon!</p>
            )}
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 p-3 bg-gray-800 rounded-md shadow-sm"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${message.role === 'owner' ? 'bg-purple-500' : 'bg-green-500'} flex items-center justify-center border-2 ${message.role === 'owner' ? 'border-purple-700' : 'border-green-700'}`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-bold ${message.role === 'owner' ? 'text-purple-300' : 'text-green-300'}`}>
                      {message.sender}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()} - {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-100 mt-1 text-sm break-words">{message.text}</p>
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicChatDisplay;
