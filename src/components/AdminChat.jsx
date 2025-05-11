
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const AdminChat = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);
  const { toast } = useToast();

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('adminChatMessages') || '[]');
    setMessages(savedMessages);
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('adminChatMessages', JSON.stringify(messages));
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: currentUser.username,
        role: currentUser.role,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      toast({
        title: "Nachricht gesendet",
        description: "Deine Nachricht wurde erfolgreich gesendet.",
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-900 rounded-lg border-2 border-gray-800">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${message.role === 'owner' ? 'bg-purple-600' : 'bg-green-600'} flex items-center justify-center`}>
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${message.role === 'owner' ? 'text-purple-400' : 'text-green-400'}`}>
                  {message.sender}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-white mt-1">{message.text}</p>
            </div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>
      
      <div className="border-t-2 border-gray-800 p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Schreibe eine Nachricht..."
            className="minecraft-input flex-1"
            multiline
          />
          <Button
            onClick={handleSendMessage}
            className="minecraft-btn-blue"
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
