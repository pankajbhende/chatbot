import { useState, useEffect } from 'react';

export type ChatMessage = {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: number;
};

const STORAGE_KEY = 'echoMindChatHistory';

const useChatHistory = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const addMessage = (sender: 'user' | 'bot', content: string) => {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender,
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    messages,
    addMessage,
    clearHistory,
  };
};

export default useChatHistory;
