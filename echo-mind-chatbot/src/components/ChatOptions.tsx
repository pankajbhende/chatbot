import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/ChatOptions.css';
import Dashboard from './Dashboard';

const ChatOptions: React.FC = () => {
  const navigate = useNavigate();

  const tabs = [
    { label: 'Chat with FinBot', path: '/chat/echo' },
    // { label: 'Talk with FinBot', path: '/voice' },
    // { label: 'Financial Tools', path: '/tools' },
    { label: 'Insights', path: '/insights' }
  ];

  return (
    <div className="chat-options-container">
      {/* Header */}
      <header className="chat-options-header">
        <div className="chat-options-branding">
          <img
            src={require('../images/db-logo-1.svg.png')}
            alt="FinBot Logo"
            className="chat-options-logo"
          />
          <span className="chat-options-title">FinBot</span>
        </div>
      </header>

      {/* Image section */}
      <div className="chat-options-image-container">
        <div className="chat-options-image-overlay"></div>
      <div className="chat-options-image-wrapper">
        <img
          src={require('../images/welcome-crop.jpg')}
          alt="Finance Illustration"
          className="chat-options-main-image"
        />
      </div>
      </div>

      {/* Tabs section */}
      <div className="chat-options-tabs-wrapper">
        <div className="chat-options-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.path}
              className="chat-options-tab"
              onClick={() => navigate(tab.path)}
            >
              <span>{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
      <Dashboard/>
    </div>
  );
};

export default ChatOptions;