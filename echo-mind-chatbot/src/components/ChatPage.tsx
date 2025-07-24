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
  const [age, setAge] = useState<number>();
  const [salary, setSalary] = useState<number>();
  const [minority, setMinority] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch("https://financialinc-1339752296.asia-south1.run.app/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          age,
          salary,
          isMinority: minority,
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = { role: 'assistant', text: data.response };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("API error:", error);
    }
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

  const speakText = (text: string) => {
    stopSpeech(); // Cancel previous before speaking new
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (!listening && transcript) {
      setInput(transcript);
    }
  }, [transcript, listening]);

  return (
    <div className="chatgpt-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img
            src={require('../images/chatbot.png')}
            alt="User Icon"
            className="sidebar-icon"
          />
          EchoMind
        </div>

        <div className="user-details-form">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="minority">Minority Category</label>
            <select
              id="minority"
              name="minority"
              value={minority ? 'yes' : 'no'}
              onChange={(e) => setMinority(e.target.value === 'yes')}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="chat-list">
          <div className="chat-item" onClick={handleNewChat}>
            New Chat
          </div>
        </div>
      </aside>

      <main className="chat-main">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && (
              <>
                <button
                  className="tts-button"
                  onClick={() => speakText(msg.text)}
                  title="Play message"
                >
                  🔊
                </button>
                {isSpeaking && (
                  <button
                    className="tts-button"
                    onClick={stopSpeech}
                    title="Stop speech"
                  >
                    ⏹️
                  </button>
                )}
              </>
            )}
            {msg.text}
          </div>
        ))}

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
