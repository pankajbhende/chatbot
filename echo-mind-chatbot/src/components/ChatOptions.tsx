import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../components/ChatOptions.css'; 

const ChatOptions: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = JSON.parse(localStorage.getItem('echoMindUser') || '{}');
  const topics = ['Financial Goals', 'Real Time Insights'];


  return (
    <div className="chat-options-container">
      <h2 className="chat-options-greeting">
        <img
          src={require('../images/profile-user.png')}
          alt="User Icon"
          className="chat-options-user-icon"
        />
        {' '}
        Hello, {user.email || 'User'}
      </h2>
<div className="chat-options-box">
      <div className="chat-options-buttons">
  <div className="chat-option chat-option-echo">
    <button onClick={() => navigate('/chat/echo')}>
      {t('chatWith', 'Chat With')}
    </button>
  </div>
  <div className="chat-option chat-option-voice">
    <button onClick={() => navigate('/voice')}>
      {t('talkWith', 'Talk With')}
    </button>
  </div>
</div>
</div>
<div className="chat-option-container">
      <div className="chat-options-section">
        <h1>{t('topics', 'Topics')}</h1>
       
        <div className="chat-options-topics">
  {topics.map((topic) => (
    <div key={topic} className="chat-options-topic">
      {topic}
    </div>
  ))}
</div>
      </div>
      </div>
      

      <hr className="chat-options-divider" />

      
    </div>
  );
};

export default ChatOptions;