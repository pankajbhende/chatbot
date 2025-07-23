import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../components/ChatPage.css';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [language, setLanguage] = useState<string>('en');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
  };

  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language });
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  useEffect(() => {
    if (!listening && transcript) {
      setInput(transcript);
    }
  }, [transcript, listening]);

  return (
    <div className="chatgpt-container">
      <aside className="sidebar">
        <div className="sidebar-header">ChatGPT</div>
        <div className="chat-list">
          <div className="chat-item" onClick={handleNewChat}>New Chat</div>
          <div className="chat-item">Interview Help</div>
        </div>
        <div className="language-select">
          <label>🌐 Language</label>
          <select value={language} onChange={handleLangChange}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
          </select>
        </div>
      </aside>

      <main className="chat-main">
        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend}>➤</button>
          <button onClick={handleVoiceInput}>🎤</button>
        </div>
      </main>
    </div>
  );
}

export default ChatPage;